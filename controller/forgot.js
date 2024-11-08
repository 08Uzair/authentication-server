import { auth } from "../models/auth.js";
import nodemailer from "nodemailer";

// Function to generate OTP
function generateOtp() {
  return Math.floor(10000 + Math.random() * 90000);
}

// Function to send mail
export const sendMail = async (email, otp) => {
  try {
    if (!email) {
      throw new Error("Recipient email is undefined");
    }

    console.log("Sending email to:", email); // Debugging log

    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "uq0803@gmail.com",
        pass: "nzquossiqqivxjmu",
      },
    });

    // Send mail with the generated OTP
    let info = await transporter.sendMail({
      from: "Uzer Qureshi", // sender address
      to: email, // list of receivers
      subject: "OTP Generated for Resetting the Password", // Subject line
      text: `The OTP for your Password Resetting is ${otp}`, // plain text body
      html: `Your OTP is <h1>${otp}</h1>`, // html body
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error in sendMail:", error);
    throw new Error("Failed to send email");
  }
};

// Function to find user by email
const findUserByEmail = async (email) => {
  try {
    const user = await auth.findOne({ email });
    return user !== null;
  } catch (error) {
    console.log(error);
    throw new Error("Database query failed");
  }
};

// Function to update OTP in the database
const findByEmailAndUpdate = async (email, otp) => {
  try {
    const user = await auth.findOneAndUpdate({ email }, { otp }, { new: true });
    if (!user) {
      throw new Error("Email not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update OTP");
  }
};

// Controller function to get OTP
export const getOtp = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const isUserExists = await findUserByEmail(email);
    if (isUserExists) {
      const otp = generateOtp();
      await findByEmailAndUpdate(email, otp);
      const info = await sendMail(email, otp);
      return res.status(200).json({ message: "OTP sent successfully", info });
    } else {
      return res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    console.error("Error in getOtp:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller function to verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otpB } = req.body;
  if (!email || !otpB) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (user.otp === otpB) {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller function to reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required" });
  }

  try {
    const user = await auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Assuming password is hashed before saving in the database
    user.password = newPassword; // Consider hashing the password here
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Router.post("/verify-otp", verifyOtp);
// Router.post("/reset-password", resetPassword);
