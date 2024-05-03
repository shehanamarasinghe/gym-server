import { db } from "../db.js";

export const storeData = (req, res) => {
  const { userdata } = req.body;

  
  const selectSql = 'SELECT * FROM login WHERE UserName = ?';
  db.query(selectSql, [userdata], (selectErr, selectResult) => {
      if (selectErr) {
          console.error('Error checking user data in database:', selectErr);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      if (selectResult.length > 0) {
          const sql = 'INSERT INTO scanned_data (Userqr) VALUES (?)';
          db.query(sql, [userdata], (err, result) => {
              if (err) {
                  console.error('Error storing data in database:', err);
                  res.status(500).json({ error: 'Internal Server Error' });
                  return;
              }
              console.log('Data stored in database');
              res.status(200).json({ message: 'Data stored successfully' });
          });
      } else {
          
          console.log('User data does not exist in logintable');
          res.status(404).json({ error: 'User data not found' });
      }
  });
};



export const CheckoutstoreData = (req, res) => {
  const { userdata } = req.body;

  const selectSql = 'SELECT * FROM login WHERE UserName = ?';
  db.query(selectSql, [userdata], (selectErr, selectResult) => {
      if (selectErr) {
          console.error('Error checking user data in database:', selectErr);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      if (selectResult.length > 0) {
          const sql = 'INSERT INTO checkout (userQr) VALUES (?)';
          db.query(sql, [userdata], (err, result) => {
              if (err) {
                  console.error('Error storing data in database:', err);
                  res.status(500).json({ error: 'Internal Server Error' });
                  return;
              }
              console.log('Data stored in database');
              res.status(200).json({ message: 'Data stored successfully' });
          });
      } else {
          
          console.log('User data does not exist in logintable');
          res.status(404).json({ error: 'User data not found' });
      }
  });
};


export const Livecheckin = (req, res) => {

  db.query("SELECT COUNT(*) AS total_checked_in FROM scanned_data WHERE DateTime>= NOW() - INTERVAL 1 DAY AND NOT EXISTS (SELECT 1 FROM checkout WHERE checkout.userQr = scanned_data.Userqr AND checkout.DateTime >= scanned_data.DateTime)", (error, results, fields) => {
    if (error) throw error;
    res.json(results[0]);
  });

};



export const Lastsevendays = (req, res) => {
db.query(`
SELECT 
  DAYNAME(datetime) AS weekday,
  COUNT(*) AS total_checkins
FROM 
scanned_data 
WHERE 
  datetime >= NOW() - INTERVAL 7 DAY 
  AND WEEKDAY(datetime) BETWEEN 0 AND 4
GROUP BY 
  DAYNAME(datetime)
ORDER BY 
  FIELD(DAYNAME(datetime), 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')
`, (error, results, fields) => {
if (error) throw error;
res.json(results);
});

};













