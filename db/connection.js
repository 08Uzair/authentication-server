import mongoose from "mongoose";

const URI =
  "mongodb+srv://avez3npqureshi:otp-auth@cluster0.cgbhdel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATA BASE IS CONNECTED");
  } catch (error) {
    console.log(error);
  }
};
