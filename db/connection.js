import mongoose from "mongoose";

const URI =
  "mongodb+srv://uzer:uzer@cluster0.khlps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATA BASE IS CONNECTED");
  } catch (error) {
    console.log(error); 
  }
};
