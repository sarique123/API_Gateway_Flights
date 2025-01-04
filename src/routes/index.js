const express = require('express');

const v1route = require('./v1');


const router = express.Router(); 

router.use('/v1', v1route);


module.exports = router;