import asyncHandler from "express-async-handler";
import { IUserRequest } from "../../types";
import Goal from "../models/goalModel";

// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req: IUserRequest, res) => {
	// #swagger.description = 'Get goals'
	// #swagger.tags = ['Goals']
	const goals = await Goal.find({ user: req.user });
	/* #swagger.responses[200] = {
		schema:  [{ $ref: '#/definitions/Goal'}]
	} */
	res.json(goals);
});

// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req: IUserRequest, res) => {
	// #swagger.description = 'Set goal'
	// #swagger.tags = ['Goals']
	if (!req.body.text) {
		// #swagger.responses[400] = { schema: { $ref: '#/definitions/Error' }}
		res.status(400);
		throw new Error("Please add a text field");
	}
	const goal = await Goal.create({ text: req.body.text, user: req.user });
	/* #swagger.responses[201] = {
		description: 'User successfully created.',
		schema: { 
			$ref: '#/definitions/Goal',
		}
	} */

	res.status(201).json({ _id: goal._id, text: goal.text, user: goal.user._id });
});

// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req: IUserRequest, res) => {
	// #swagger.description = 'Update goal'
	// #swagger.tags = ['Goals']
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		// #swagger.responses[400] = { schema: { $ref: '#/definitions/Error' }}
		res.status(400);
		throw new Error("Goal not found");
	}
	if (goal.user.toString() !== req.user.id) {
		// #swagger.responses[401] = { schema: { $ref: '#/definitions/Error' }}
		res.status(401);
		throw new Error("Unauthorised");
	}
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
	/* #swagger.responses[200] = {
		schema:  { $ref: '#/definitions/Goal'}
	} */
	res.json(updatedGoal);
});

// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req: IUserRequest, res) => {
	// #swagger.description = 'Delete goal'
	// #swagger.tags = ['Goals']
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		// #swagger.responses[400] = { schema: { $ref: '#/definitions/Error' }}
		res.status(400);
		throw new Error("Goal not found");
	}
	if (goal.user.toString() !== req.user.id) {
		// #swagger.responses[401] = { schema: { $ref: '#/definitions/Error' }}
		res.status(401);
		throw new Error("Unauthorised");
	}
	await Goal.findByIdAndDelete(req.params.id);
	res.status(200).send("Deleted");
});

export { getGoals, setGoal, deleteGoal, updateGoal };
