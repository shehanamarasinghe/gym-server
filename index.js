import express from "express";
import usersRoutes from "./routs/users.js";
import authRoutes from "./routs/auth.js";
import cookieParser from "cookie-parser";
import workoutRouts from "./routs/auth.js";
import MealRouts from "./routs/Mealplan.js";
import scanRoutes from "./routs/Qrscanner.js";
import userRoutes from "./routs/users.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRouts);
app.use("/api/AddMemberMeal", MealRouts);
app.use("/api/store-data", scanRoutes);
app.use("/api/user", userRoutes);

app.listen(8081, () => {
    console.log("Listening....");
});



