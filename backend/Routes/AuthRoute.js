import { Signup , Login } from "../Controller/AuthController.js"
import { userVerification } from "../Middlewares/AuthMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/verify", userVerification);
router.post("/Register", Signup);
router.post("/login" , Login)

export { router };