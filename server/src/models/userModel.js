import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "This email address already exist"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/duqjlnnbu/image/upload/v1626254516/avatar/avatar-1_fsuuac.png",
    },
    status: { type: String, default: "Hey there, I am using whatsapp" },
    password: {
      type: String,
      required: [true, "Plese provide a password"],
      minLenght: [6, "Password must be at least 6 characters long"],
      maxLenght: [
        128,
        "Password make sure that you password is not more than 128 characters long",
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model.User || mongoose.model("User", userSchema);

export default User;
