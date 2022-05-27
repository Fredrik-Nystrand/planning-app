const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

const createEvent = asyncHandler(async(req, res) => {

    const userId = req.user.id;
    const { title, desc, dateTime, color } = req.body;

    const event = await Event.create({
        user: userId,
        title,
        desc,
        dateTime,
        color
    });

    if (event) {
        res.status(201).json(event);
    } else {
        res.status(400);
        throw new Error("Kunde inte skapa ett event, felaktigt angiven information");
    }
});

const getEvents = asyncHandler(async(req, res) => {
    const events = await Event.find({ user: req.user.id });

    res.status(200).json(events);
});

const getEventsByUserId = asyncHandler(async(req, res) => {
  if (req.params.id.length !== 24) {
    res.status(400);
    throw new Error("Ange ett id med korrekt format");
}
  const events = await Event.find({ user: req.params.id });

  res.status(200).json(events);
});

const getSingleEvent = asyncHandler(async(req, res) => {
    if (req.params.id.length !== 24) {
        res.status(400);
        throw new Error("Ange ett id med korrekt format");
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error("Kunde inte hitta något event");
    }

    res.status(200).json(event);
});





const updateEvent = asyncHandler(async(req, res) => {
    if (req.params.id.length !== 24) {
        res.status(400);
        throw new Error("Ange ett id med korrekt format");
    }

    const event = await Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
        returnOriginal: false,
    });

    if (!event) {
        res.status(404);
        throw new Error("Kunde inte hitta ett event");
    }

    res.status(200).json(event);
});





const deleteEvent = asyncHandler(async(req, res) => {
    if (req.params.id.length !== 24) {
        res.status(400);
        throw new Error("Ange ett id med korrekt format");
    }

    const event = await Event.findOneAndDelete({ _id: req.params.id });

    if (!event) {
        res.status(404);
        throw new Error("Kunde inte hitta ett event");
    }

    res.status(200).json(event.id);
});

module.exports = {
    createEvent,
    getEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    getEventsByUserId
};