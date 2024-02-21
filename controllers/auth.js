import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req,res)=>{

    const q = "SELECT * FROM login WHERE Email = ? OR  UserName = ?"

    db.query(q, [req.body.email, req.body.username], (err,data)=>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO login (Firstname, Lastname, UserName, Address, Email, PhoneNo, Gender, Age, Weight, Height, Password) VALUES (?)"

        const values =  [
            req.body.firstname,
            req.body.lastname,
            req.body.username,
            req.body.address,
            req.body.email,
            req.body.phoneNo,
            req.body.gender, 
            req.body.age,
            req.body.weight,
            req.body.height,
            hash,
          ]

          db.query(q, [values], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created")

          });

    });

};

export const login = (req, res) => {
    const q = "SELECT * FROM login WHERE UserName = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");


        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].Password
        );


        if (!isPasswordCorrect) {
            console.log("Password is incorrect");
            return res.status(400).json("Wrong username or password!");
        }

        const token = jwt.sign({ userid: data[0].userid }, "jwtkey");
        const { Password, ...other } = data[0]; 

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);
    });
};


export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite: "none",
        secure:true
    }).status(200).json("user has been logged out.")
}