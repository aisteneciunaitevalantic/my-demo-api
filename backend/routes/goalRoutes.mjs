import express from "express";
const router = express.Router();
import { getGoals, setGoal, updateGoal, deleteGoal } from "../controllers/goalController.mjs";

import { protect } from "../middleware/authMiddleware.mjs";
router.route("/").get(protect, getGoals).post(protect, setGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
