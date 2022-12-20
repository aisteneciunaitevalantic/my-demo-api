import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { IUserRequest } from "../../types";
const salt = bcrypt.genSaltSync(10);

const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc Register user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req: IUserRequest, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add missing fields");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}
	const hash = bcrypt.hashSync(password, salt);
	const user = await User.create({ name, email, password: hash });

	if (user) {
		res.status(201).send({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc Authenticate user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error("Please add missing fields");
	}

	const user = await User.findOne({ email });
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	if (!(await bcrypt.compare(password, user.password))) {
		res.status(401);
		throw new Error("Incorrect password");
	}

	res.send({
		_id: user.id,
		name: user.name,
		email: user.email,
		token: generateToken(user.id),
	});
});

// @desc Get user data
// @route GET /api/users/me
// @access Private

const getMe = asyncHandler(async (req: IUserRequest, res) => {
	res.send(req.user);
});

export { registerUser, loginUser, getMe };
