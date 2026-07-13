import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { body } from "express-validator";
import validate from "../middleware/validationMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("role")
      .isIn(["Investor", "Entrepreneur"])
      .withMessage("Invalid role"),
  ],
  validate,
  registerUser
);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validate,
  loginUser
);
router.get("/profile", protect, getProfile);
router.get(
  "/investor-dashboard",
  protect,
  authorizeRoles("Investor"),
  (req, res) => {
    res.json({
      message: "Welcome Investor",
    });
  }
);

router.get(
  "/entrepreneur-dashboard",
  protect,
  authorizeRoles("Entrepreneur"),
  (req, res) => {
    res.json({
      message: "Welcome Entrepreneur",
    });
  }
);
export default router;