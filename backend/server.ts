import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import connectDb from "./config/db";
import goalRoutes from "./routes/goalRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

connectDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
