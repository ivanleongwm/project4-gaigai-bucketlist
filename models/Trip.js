const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    tripIndex: {type: Number, required: false},
    location: {type: String, required: false},
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    activity: {type: String, required: false},
    photos: [String],
});

const Trip = mongoose.model("trip-details", tripSchema);

module.exports = Trip;