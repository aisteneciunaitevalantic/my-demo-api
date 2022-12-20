import mongoose from "mongoose";

import colors from "colors";

const connectDb = async () => {
	try {
		if (!process?.env?.MONGO_URI) throw new Error("Missing mongo uri");
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(colors.cyan.underline(`MongoDB connected: ${conn.connection.host}`));
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDb;
