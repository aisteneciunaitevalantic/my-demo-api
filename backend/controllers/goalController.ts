import asyncHandler from "express-async-handler";
import { IUserRequest } from "../../types";
import Goal from "../models/goalModel";

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req: IUserRequest, res) => {
	const goals = await Goal.find({ user: req.user });
	res.json(goals);
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req: IUserRequest, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add a text field");
	}
	const goal = await Goal.create({ text: req.body.text, user: req.user });
	res.json(goal);
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req: IUserRequest, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Unauthorised");
	}
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req: IUserRequest, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Unauthorised");
	}
	await Goal.findByIdAndDelete(req.params.id);
	res.status(200).send("Deleted");
});

export { getGoals, setGoal, deleteGoal, updateGoal };
