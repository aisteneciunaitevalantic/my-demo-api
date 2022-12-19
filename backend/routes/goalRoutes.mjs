import express from "express";
const router = express.Router();
import { getGoals, setGoal, updateGoal, deleteGoal } from "../controllers/goalController.mjs";

router.route("/").get(getGoals).post(setGoal);

router.route("/:id").put(updateGoal).delete(deleteGoal);

export default router;
