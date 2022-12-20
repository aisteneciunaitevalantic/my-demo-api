import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { IUserRequest } from "../../types";
const salt = bcrypt.genSaltSync(10);

const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req: IUserRequest, res) => {
	// #swagger.tags = ['Users']
	// #swagger.description = 'Register user'
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		// #swagger.responses[400] = { schema: { $ref: '#/definitions/Error' }}
		res.status(400);
		throw new Error("Please add missing fields");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		// #swagger.responses[400] = { schema: { $ref: '#/definitions/Error' }}
		res.status(400);
		throw new Error("User already exists");
	}
	const hash = bcrypt.hashSync(password, salt);
	const user = await User.create({ name, email, password: hash });

	if (user) {
		/* #swagger.responses[201] = {
			description: 'User successfully created.',
			schema: { 
				$ref: '#/definitions/UserAuth',
			}
		} */
		res.status(201).send({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		// #swagger.responses[400] = { schema: { $ref: '#/definitions/Error' }}
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	// #swagger.tags = ['Users']
	// #swagger.description = 'Authenticate user'
	const { email, password } = req.body;
	if (!email || !password) {
		// #swagger.responses[400] = { schema: { $ref: '#/definitions/Error' }}
		res.status(400);
		throw new Error("Please add missing fields");
	}

	const user = await User.findOne({ email });
	if (!user) {
		// #swagger.responses[404] = { schema: { $ref: '#/definitions/Error' }}
		res.status(404);
		throw new Error("User not found");
	}

	if (!(await bcrypt.compare(password, user.password))) {
		// #swagger.responses[401] = { schema: { $ref: '#/definitions/Error' }}
		res.status(401);
		throw new Error("Incorrect password");
	}

	/* #swagger.responses[200] = {
		description: 'User successfully logged in.',
		schema: { 
			$ref: '#/definitions/UserAuth',
		}
	} */
	res.send({
		_id: user.id,
		name: user.name,
		email: user.email,
		token: generateToken(user.id),
	});
});

// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req: IUserRequest, res) => {
	// #swagger.tags = ['Users']
	// #swagger.description = 'Get user data'
	/* #swagger.responses[200] = {
		schema: { 
			$ref: '#/definitions/User',
		}
	} */
	res.send(req.user);
});

export { registerUser, loginUser, getMe };
