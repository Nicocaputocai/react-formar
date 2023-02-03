const express = require('express');
const router = express.Router();

const {profile} = require('../controllers/usersControllers');
const checkToken = require('../middleware/checkToken');

/* /api/users */
router.get('/profile', checkToken ,profile);

module.exports = router;