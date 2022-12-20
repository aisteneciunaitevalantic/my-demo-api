import { Schema, model } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
	},
	{ timestamps: true }
);

export default model("User", userSchema);
