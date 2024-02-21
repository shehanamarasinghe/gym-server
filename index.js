import express from "express";
import usersRouts from "./routs/users.js"
import authRouts from "./routs/auth.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use("/api/users", usersRouts)
app.use("/api/auth", authRouts)




app.listen(8081, () => {
  console.log("Listening....");
});