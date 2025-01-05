const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddleWares } = require('../../middlewares')

const router = express.Router();

//  /api/v1/signup/  POST
router.post('/signup', AuthRequestMiddleWares.validateAuthRequest, UserController.signup);

//  /api/v1/signin/  POST
router.post('/signin', AuthRequestMiddleWares.validateAuthRequest, UserController.signin);

module.exports = router;