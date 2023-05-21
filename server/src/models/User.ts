import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  document: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);
