import express from "express";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes.mjs";
import { errorHandler } from "./middleware/errorMiddleware.mjs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;

app.use("/api/goals", goalRoutes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
