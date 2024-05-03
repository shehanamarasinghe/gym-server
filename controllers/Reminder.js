import { db } from "../db.js";

export const createReminder = (req, res) => {
  const Reminder = "INSERT INTO reminders (Title, Discription, DateTime) VALUES (?, ?, ?)";
  const values = [req.body.Title, req.body.Discription, req.body.DateTime];
  db.query(Reminder, values, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Reminder has been added");
  });
};
 