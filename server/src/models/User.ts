import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  cpf: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
