import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const userData = {
	_id: "63a06b3269e731383e275b32",
	name: "Jhon Doe",
	email: "email@mail.mail",
};

const doc = {
	info: {
		title: "My API",
		description: "Description",
	},
	host: `localhost:${port}`,
	schemes: ["http"],
	definitions: {
		UserAuth: {
			...userData,
			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.Y4rwScILgHeZNmE4cWtTX524mg55VZEn10awsxDHpNo",
		},
		User: userData,
		Goal: {
			_id: "63a06b3269e731383e275b32",
			user: "63a0673b2df030194b5ea1fb",
			text: "Goal text",
		},
		Error: {
			message: "error message",
		},
	},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./backend/server.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
