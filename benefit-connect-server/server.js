import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import benefitRouter from "./routes/benefit.route.js";
import eligibilityRouter from "./routes/eligibility.route.js";
import userRouter from "./routes/user.route.js";
import contactRouter from "./routes/contact.route.js";
import "dotenv/config";

// app config
const app = express();
const PORT = 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connection
connectDB();

// api endpoints
app.use("/images", express.static("uploads"));
app.use("/api/auth", authRouter);
app.use("/api/benefit", benefitRouter);
app.use("/api/eligibility", eligibilityRouter);
app.use("/api/user", userRouter);
app.use("/api/inquiry", contactRouter);

app.listen(PORT, () => {
  console.log("Listening on PORT:", PORT);
});
