const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    date: {
        type: Date,
        default: Date.now
    }, 
    exercise: [{
        type: {
            type: String,
            trim: true,
            required: "select type of workout",

        }, 
        name: {
            type: String,
            trim: true,
        },
        duration: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        }
        }]
})

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

    



      