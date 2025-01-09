const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddleWares } = require('../../middlewares')

const router = express.Router();

//  /api/v1/user/signup/  POST
router.post('/signup', AuthRequestMiddleWares.validateAuthRequest, UserController.signup);

//  /api/v1/user/signin/  POST
router.post('/signin', AuthRequestMiddleWares.validateAuthRequest, UserController.signin);

//  /api/v1/user/role  POST
router.post('/role', AuthRequestMiddleWares.checkAuth, AuthRequestMiddleWares.checkAdmin,UserController.addRoleToUser);

module.exports = router;