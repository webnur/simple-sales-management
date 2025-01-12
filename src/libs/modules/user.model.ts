import mongoose from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgetPasswordToken: string;
  forgetPasswordExpire: Date;
  verifyToken: string;
  verifyExpire: Date;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgetPasswordToken: String,
  forgetPasswordExpire: Date,
  verifyToken: String,
  verifyExpire: Date,
});

const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
