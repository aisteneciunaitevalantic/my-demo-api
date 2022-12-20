import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
const doc = {
	info: {
		title: "My API",
		description: "Description",
	},
	host: `localhost:${port}`,
	schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./backend/server.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
