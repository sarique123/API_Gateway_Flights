const express = require('express');

const { InfoController } = require('../../controllers');

const {AuthRequestMiddleWares} = require('../../middlewares');

const userRoutes = require('./user-routes');

const router = express.Router();

router.use('/user', userRoutes);

router.get('/info', AuthRequestMiddleWares.checkAuth, InfoController.info);

module.exports = router;