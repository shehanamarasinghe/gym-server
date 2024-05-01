import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

export const register = (req, res) => {
    const q = "SELECT * FROM login WHERE Email = ? OR UserName = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO login (Firstname, Lastname, UserName, Address, Email, PhoneNo, Gender, Age, Weight, Height, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [
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
        ];

        db.query(insertQuery, values, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
    });
};

export const Mlogin = (req, res) => {
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

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
};

export const generateQRCode = (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is missing" });
    }

    const qrCodeData = `User ID: ${userId}`;

    QRCode.toDataURL(qrCodeData, (err, qrCodeUrl) => {
        if (err) {
            console.error("Error generating QR code:", err);
            return res.status(500).json({ error: "Failed to generate QR code" });
        }

        console.log("Generated QR code URL:", qrCodeUrl);

        db.query("INSERT INTO qr_codes(user_id, qr_code) VALUES (?, ?)", [userId, qrCodeUrl], (err, result) => {
            if (err) {
                console.error("Error storing QR code in database:", err);
                return res.status(500).json({ error: "Failed to store QR code in database" });
            }

            console.log("QR code stored in database.");

            res.status(200).json({ message: "QR code generated and stored successfully", userId });
        });
    });
};

export const getQRCode = (req, res) => {
    const userId = req.params.userId;

    db.query("SELECT qr_code FROM qr_codes WHERE user_id = ?", [userId], (err, results) => {
        if (err) {
            console.error("Error retrieving QR code from database:", err);
            return res.status(500).json({ error: "Failed to retrieve QR code from database" });
        }

        if (results.length === 0) {
            console.error("QR code not found in the database.");
            return res.status(404).json({ error: "QR code not found" });
        }

        const qrCodeUrl = results[0].qr_code;
        console.log("Retrieved QR code URL from database:", qrCodeUrl);
        res.status(200).json({ qrCodeUrl });
    });
};
