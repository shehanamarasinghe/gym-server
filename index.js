//index.js

import express from "express";
import usersRoutes from "./routs/users.js";
import authRoutes from "./routs/auth.js";
import cookieParser from "cookie-parser";
import workoutRouts from "./routs/auth.js";
import MealRouts from "./routs/Mealplan.js";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRouts);
app.use("/api/MemberMeal", MealRouts);


app.listen(8081, () => {
    console.log("Listening....");
});
