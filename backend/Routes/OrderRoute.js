import express from "express";
import { createOrder } from "../Controller/OrderController.js";

const router = express.Router();

router.post("/orders", createOrder);

export { router as orderRouter };
