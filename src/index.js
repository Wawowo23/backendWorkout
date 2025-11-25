const express = require("express")
const cors = require('cors')
const v1WorkoutRouter = require("./v1/routes/workout_routes")

const app = express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

// app.get("/", (request, response) => {
//     response.send("<h1>Servidor básico funcionando</h1>")
// });

app.use("/api/v1/workouts", v1WorkoutRouter)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})