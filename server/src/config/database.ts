import mongoose from "mongoose";

export function initializeDatabase() {
  const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/nome_sobrenome";
  mongoose
    .connect(dbUri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(`Failed to connect to db`, err);
    });
}
