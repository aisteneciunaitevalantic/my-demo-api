import { Types } from "mongoose";

export interface IGoal {
	user: Types.ObjectId;
	text: string;
}
