import mongoose from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;

}

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
});

const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
