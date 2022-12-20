import express from "express";
const router = express.Router();
import { registerUser, loginUser, getMe } from "../controllers/userController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
