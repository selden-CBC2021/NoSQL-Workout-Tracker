const router = require("express").Router();
const Workout = require("../models/Workout");

// api/workouts endpoint
router.get("/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        },
    {
        $sort: {
            'day': 1
        }
    }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
})
//  gets all workouts in 7 day range  
router.get("/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    },
    {
        $sort: {
            'day': -1
        }
    },
    {
        $limit: 7
    },
    {
        $sort: {
            'day': 1
        }
    }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
		
})
// route for creating a workout
router.post("/workouts", (req, res) => {
    Workout.create(req.body)
        .then(workoutCreate => {
            res.json(workoutCreate);
        })
        .catch((err) => {
            res.json(err)
        })
})
// route for updating a workout
router.put("/workouts/:id", (req, res) => {
    let id = req.params.id;
    let newData = req.body;

    Workout.findOneAndUpdate({_id: id}, {
        $push: { exercises: newData } },
        { new: true }
    ).then(workoutUpdate => {
        res.send(workoutUpdate);
    }).catch(err => {
        res.json(err);
    });
})

module.exports = router
