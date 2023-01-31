const express = require('express');
const router = express.Router();

const {profile} = require('../controllers/usersControllers')

/* /api/users */
router.get('/', profile);

module.exports = router;