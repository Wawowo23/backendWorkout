const express = require("express")
const apicache = require('apicache')
const router = express.Router();
const cache = apicache.middleware;
const workoutControler = require("../../controllers/workout_controller")

//router.get("/", workoutControler.getAllWorkouts);

router.get('/records/', cache("1 minute"), workoutControler.getAllRecords)
router.get('/records/:recordId', workoutControler.getOneRecord)
router.post('/records/', workoutControler.createNewRecord)

router.get('/', cache("1 minute"), workoutControler.getAllWorkouts)
router.get("/:workoutId", workoutControler.getOneWorkout);
router.post("/", workoutControler.createNewWorkout);
router.patch("/:workoutId", workoutControler.updateOneWorkout);
router.delete("/:workoutId", workoutControler.deleteOneWorkout);

module.exports = router;