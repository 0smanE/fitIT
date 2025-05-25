const fetch = require('node-fetch');

const EXERCISEDB_URL = 'https://exercisedb.p.rapidapi.com';
const HEADERS = {
  'X-RapidAPI-Key': "015c52bb70msh0ca69c0c0da9fa3p13dce6jsnc05c3d5b2905",
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

const fetchAllExercises = async () => {
  const res = await fetch(`${EXERCISEDB_URL}/exercises`, { headers: HEADERS });
  return await res.json();
};

const fetchBodyParts = async () => {
  const res = await fetch(`${EXERCISEDB_URL}/exercises/bodyPartList`, { headers: HEADERS });
  return await res.json();
};

const fetchTargets = async () => {
  const res = await fetch(`${EXERCISEDB_URL}/exercises/targetList`, { headers: HEADERS });
  return await res.json();
};

// function toggleExerciseInWorkout(workoutId, exerciseId, callback) {
//   const sqlCheck = `SELECT * FROM workout_exercises WHERE workout_id = ? AND exercise_id = ?`;
//   db.get(sqlCheck, [workoutId, exerciseId], (err, row) => {
//     if (err) return callback(err);

//     if (row) {
//       const sqlDelete = `DELETE FROM workout_exercises WHERE workout_id = ? AND exercise_id = ?`;
//       db.run(sqlDelete, [workoutId, exerciseId], function (err2) {
//         if (err2) return callback(err2);
//         callback(null, 'Exercise removed from workout');
//       });
//     } else {
//       const sqlInsert = `INSERT INTO workout_exercises (workout_id, exercise_id) VALUES (?, ?)`;
//       db.run(sqlInsert, [workoutId, exerciseId], function (err2) {
//         if (err2) return callback(err2);
//         callback(null, 'Exercise added to workout');
//       });
//     }
//   });
// }
const deleteWorkout = (workoutId, callback) => {
  const sqlDelete = `DELETE FROM workouts WHERE id = ?`;
  db.run(sqlDelete, [workoutId], function (err) {
    if (err) return callback(err);
    callback(null);
  });
};

module.exports = {
  fetchAllExercises,
  fetchBodyParts,
  fetchTargets,
  toggleExerciseInWorkout,
  deleteWorkout,
};
