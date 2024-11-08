import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../models/auth.js";

const secret = "auth";

// SIGN IN

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await auth.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SIGN UP

export const signup = async (req, res) => {
  const { name, email, password, createdAt } = req.body;

  try {
    const oldUser = await auth.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await auth.create({
      name,
      email,
      password: hashedPassword,
      createdAt,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};

// //  GET AUTHOR BY ID

export const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await auth.findById(id);

    res.status(200).json(user);
  } catch (error) {
    error;
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // GET ALL AUTHORS

export const getAuthor = async (req, res) => {
  try {
    const user = await auth.find();
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};
