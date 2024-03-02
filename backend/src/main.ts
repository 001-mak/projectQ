import express from "express";
import dotenv from 'dotenv'
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";
import { profileRouter } from "./routes/profileRoutes";
import cors from 'cors';

dotenv.config()

const app = express();
app.use(cors())

app.use(express.json());
app.use("/auth", authRouter)
app.use("/api", userRouter)
app.use("/api", profileRouter)

app.listen(process.env.PORT, async () => {
  console.log(`running at ${process.env.PORT}`);
});
