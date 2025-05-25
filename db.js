const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`Create TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT UNIQUE NOT NULL,
        age INTEGER,
        gender TEXT NOT NULL
    )`);
  db.run(`
  CREATE TABLE workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT
  )
`);

  db.run(`
  CREATE TABLE workout_exercises (
    workout_id INTEGER,
    exercise_id TEXT,
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
  )
`);

  const stmt = db.prepare(`
        INSERT INTO users (email, password, age, gender)
         VALUES (?,?,?,?)
        `);
  stmt.run(`Barbara@gmail.com`, `FatShadow`, 30, `female`);
  stmt.finalize();
});
module.exports = db;
