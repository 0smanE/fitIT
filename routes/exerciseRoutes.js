const express = require("express");
const router = express.Router();
const exerciseService = require("../services/exerciseService");

router.get("/", async (req, res) => {
  try {
    const exercises = await exerciseService.fetchAllExercises();
    res.json(exercises.slice(0, 5)); // Limit output
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/bodyparts", async (req, res) => {
  try {
    const parts = await exerciseService.fetchBodyParts();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/targets", async (req, res) => {
  try {
    const targets = await exerciseService.fetchTargets();
    res.json(targets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/workout/:id", (req, res) => {
  const workoutId = req.params.id;
  const { exerciseId } = req.body;

  if (!exerciseId) {
    return res.status(400).json({ error: "Exercise ID is required" });
  }

  exerciseService.toggleExerciseInWorkout(
    workoutId,
    exerciseId,
    (err, message) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message });
    }
  );
});
router.delete("/workout/:id", (req, res) => {
  const workoutId = req.params.id;

  exerciseService.deleteWorkout(workoutId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Workout deleted successfully" });
  });
});

module.exports = router;
