import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as config from "../utils/config.js";
import jwt from "jsonwebtoken";
import validator from "validator";
// will be used once reset password is implemented ---> import crypto from "crypto";

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
      default:config.default_avatar,
    },
    status: { type: String, default:config.default_status },
    password: {
      type: String,
      required: [true, "Plese provide a password"],
      minLenght: [6, "Password must be at least 6 characters long"],
      maxLenght: [128,"Password make sure that you password is not more than 128 characters long"],
      select:false
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);


// Encrypt password using bcrypt.
userSchema.pre('save', async function(next){

  // Check if the password field has been modified.
  if(!this.isModified('password')){

      // If the password has not been modified, call the next middleware function in the stack.
      next()
  }

  // Generate a "salt" using bcrypt. 
  const salt = await bcrypt.genSalt(10)

  // Hash (encrypt) the user's password with the generated salt using bcrypt.
  this.password = await bcrypt.hash(this.password, salt)

  // Call the next middleware function in the stack.
  next();

  }

)


// Match user entered password to hashed password in database.
userSchema.methods.matchPassword = async function(enteredPassword){

  // Compare the entered password with the hashed password in the database.
  return await bcrypt.compare(enteredPassword, this.password)
}


// sign JWT and return
userSchema.methods.getSignedJwtToken = function(){

  // Sign a JSON Web Token (JWT) and return it.
  return jwt.sign({id: this._id}, config.jwt_secret, { expiresIn: config.jwt_expire})

}



const User = mongoose.model("User", userSchema);

export default User;
