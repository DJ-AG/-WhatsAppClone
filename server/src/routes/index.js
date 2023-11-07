import express from "express";
import authroute from "./auth.route.js";

const router = express.Router();

router.use('/auth', authroute);

export default router;

