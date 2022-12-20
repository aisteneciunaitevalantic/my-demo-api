import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.mjs";

const protect = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1];

	if (!authHeader || !authHeader.startsWith("Bearer") | !token) {
		res.status(401);
		throw new Error("Not authorized");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} catch (error) {
		console.log(error);
		res.status(401);
	}
});

export { protect };
