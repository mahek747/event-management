const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    maxAttendees: {
        type: Number,
        required: true,
    },
    image: {
        type: String, 
        required: false,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema, "events");

module.exports = Event;
