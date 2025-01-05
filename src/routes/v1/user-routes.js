const express = require('express');
const { UserController } = require('../../controllers');

const router = express.Router();

//  /api/v1/signup/  POST
router.post('/',UserController.signup);

module.exports = router;