import User from "../models/userModel.js";
import validator from "validator";
import * as config from "../utils/config.js";


 const register = async (req, res, next) => {
  try {

    // get user data from req.body
    const { name, email, password, status, avatar } = req.body;

    // check if fields are empty 
    if(!name) throw new Error("Please provide your name");

    if(!email) throw new Error("Please provide your email");

    if(!password) throw new Error("Please provide your password");

    // check if name and password are valid length
    if(!validator.isLength(name,{min:2,max:16})) throw new Error("name must be at least 2 characters long");

    if(!validator.isLength(password,{min:6,max:128})) throw new Error("password must be at least 6 characters long");

    // check status length
    if(status && status.length > 64) throw new Error("status must be less then 64 characters long");

    // check if email is valid
    if(!validator.isEmail(email)) throw new Error("Please provide a valid email address");

    // check if email already exist
    const checkDB = await User.findOne({email});

    console.log(checkDB)

    if(checkDB) throw new Error("This email address already exist")

    // create a new user with the data from req.body
    const user = await User.create({

      name,
      email,
      password,
      status,
      avatar

    })

    // send back the new user
    sendTokenResponse(user, 200, res)

  } catch (error) {

    next(error);

  }
};

 const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {

    // check if user exist
    const user = await User.findOne({ email }).select("+password");

    // if user does not exist throw an error
    if (!user) throw new Error("Invalid credentials");

    // check if password is correct
    const isMatch = await user.matchPassword(password);

    // if password is not correct throw an error
    if (!isMatch) throw new Error("Invalid credentials");

    // send back the user
    res.status(200).json({ data: user, status: "success" });

  } catch (error) {

    next(error);

  }
};

 const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

 const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = (user, statusCode, res) => {

  // Generate a JWT token using a method from the User model.
  const token = user.getSignedJwtToken();

  // Options for the cookie that will store the JWT token.
  const options = {

    // Set the expiration date for the cookie.
    expires: new Date( Date.now() + config.jwt_cookie_expire * 60 * 1000 * 24 * 30 ),
    httpOnly: true,

  };

  // Set cookie secure flag to true when in production environment, making sure cookie is sent over HTTPS.
  if (process.env.NODE_ENV === "production") options.secure = true;

  res.status(statusCode).cookie("token", token, options).json({success: true, token});
}

export { register, login, logout, refreshToken}