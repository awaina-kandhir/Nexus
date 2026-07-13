import express from "express";
import {
  deposit,
  withdraw,
  transfer,
  getTransactions,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/deposit", deposit);

router.post("/withdraw", withdraw);

router.post("/transfer", transfer);

router.get("/", getTransactions);

export default router;