import express from "express";
import trimRequest from "trim-request";
import { login, logout, refreshToken, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(trimRequest.all,register)
router.route("/login").post(trimRequest.all,login)
router.route("/logout").get(trimRequest.all,logout)
router.route("/refresh_token").get(trimRequest.all,refreshToken)


export default router;
