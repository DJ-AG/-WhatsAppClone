import express from "express";
import trimRequest from "trim-request";
import { login, logout, register,getUser } from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.js";

const router = express.Router();


router.post("/register",trimRequest.all,register)

router.post("/login",trimRequest.all,login)

router.get("/logout",trimRequest.all,logout)


router.use(protect)

router.get("/getuser",trimRequest.all,getUser)


export default router;
