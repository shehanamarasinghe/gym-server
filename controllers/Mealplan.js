import { db } from "../db.js";


export const AddMeal = (req, res) => {
    const q = "SELECT * FROM login WHERE Email = ? OR UserName = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const insertQuery = "INSERT INTO mealplan (MealPlanid, MealTitle, MealDiscription, category, SunDayBreakfast, SunDayLunch, SunDayDinner, MonDayBreakfast, MonDayLunch, MonDayDinner, TuesDayBreakfast , TuesDayLunch, TuesDayDinner, WensDayBreakfast, WensDayLunch, WensDayDinner, ThursDayBreakfast, ThursDayLunch, ThursDayDinner, FriDayBreakfast, FriDayLunch, FriDayDinner, SaturDayBreakfast, SaturDayLunch, SaturDayDinner, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [
            req.body.Mtitle,
            req.body.Desce,
            req.body.Userc,
            req.body.sunb,
            req.body.sunl,
            req.body.sund,
            req.body.monb,
            req.body.monl,
            req.body.mond,
            req.body.tueb,
            req.body.tuel,
            req.body.tued,
            req.body.wenb,
            req.body.wenl,
            req.body.wend,
            req.body.thub,
            req.body.thul,
            req.body.thud,
            req.body.frib,
            req.body.fril,
            req.body.frid,
            req.body.satb,
            req.body.satl,
            req.body.satd,
            req.body.username,
           
        ];

        db.query(insertQuery, values, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Meal plan has been added");
        });
    });
};