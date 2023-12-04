import dotenv from "dotenv";

dotenv.config();

console.log(dotenv.config())

const default_avatar = process.env.DEFAULT_AVATAR_PICTURE

const default_status = process.env.DEFAULT_STATUS

const port = process.env.PORT;

const mongodb_url = process.env.MONGODB_URL;

const jwt_secret = process.env.JWT_SECRET;

const jwt_expire = process.env.JWT_EXPIRE

const jwt_cookie_expire = parseInt(process.env.JWT_COOKIE_EXPIRE);


export {
    default_avatar,
    default_status,
    port,
    mongodb_url,
    jwt_secret,
    jwt_expire,
    jwt_cookie_expire
}