import { Schema, model } from "mongoose";
import { IGoal } from "../types/goalTypes";

const goalSchema = new Schema<IGoal>(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		text: {
			type: String,
			required: [true, "Please add text value"],
		},
	},
	{ timestamps: true }
);

export default model("Goal", goalSchema);
