import asyncHandler from "express-async-handler";

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
	res.json({ message: "get goals" });
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add a text field");
	}
	res.json({ message: "set goal" });
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
	res.json({ message: `Update goal ${req.params.id}` });
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
	res.json({ message: `Delete goal ${req.params.id}` });
});

export { getGoals, setGoal, deleteGoal, updateGoal };
