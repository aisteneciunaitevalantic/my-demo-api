import { Schema, model, Types } from "mongoose";

interface IGoal {
	user: Types.ObjectId;
	text: string;
}
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
