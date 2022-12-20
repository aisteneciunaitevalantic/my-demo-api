import express from "express";
import swaggerUi from "swagger-ui-express";
import colors from "colors";

const router = express.Router();
try {
	const swaggerDocument = require("../../swagger-output.json");
	router.use("/", swaggerUi.serve);
	router.get("/", swaggerUi.setup(swaggerDocument));
} catch (error) {
	console.log(colors.yellow("swagger-output.json could not be loaded"));
}

export default router;
