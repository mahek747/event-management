const Event = require("../models/event.model");
const mongoose = require("mongoose");


const createEvent = async (req, res) => {
    const { title, description, date, location, maxAttendees, image, creator } = req.body;

    if (!title || !description || !date || !location || !maxAttendees || !creator) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            image,
            creator,
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEvent = async (req, res) => {
    const { id } = req.params;

    try {
        if (id) {
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(event);
        } else {
            const events = await Event.find();
            res.status(200).json(events);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEventById = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location, maxAttendees, image } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (title) event.title = title;
        if (description) event.description = description;
        if (date) event.date = date;
        if (location) event.location = location;
        if (maxAttendees) event.maxAttendees = maxAttendees;
        if (image) event.image = image;

        await event.save();
        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEvent, getEvent, updateEventById, deleteEventById };
