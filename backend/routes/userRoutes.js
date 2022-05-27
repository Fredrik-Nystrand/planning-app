const express = require('express');
const router = express.Router();
const { createUser, loginUser, updateUser, deleteUser, getUserInfo} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .post(createUser)

router.route('/login')
    .post(loginUser)

router.route('/:id')
    .put(protect, updateUser)
    .delete(protect, deleteUser)
    .get(protect, getUserInfo)

module.exports = router;