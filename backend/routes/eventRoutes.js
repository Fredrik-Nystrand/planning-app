const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getSingleEvent, updateEvent, deleteEvent, getEventsByUserId } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .post(protect, createEvent)
    .get(protect, getEvents)

router.route('/user/:id')
.get(protect, getEventsByUserId)


router.route('/:id')
    .get(protect, getSingleEvent)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent)

module.exports = router;