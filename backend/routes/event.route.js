const express = require("express");
const router = express.Router();
const { createEvent, getEvent, updateEventById, deleteEventById } = require("../controller/event.controller");

router.post("/create", createEvent);
router.get("/:id?", getEvent);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById);

module.exports = router;
