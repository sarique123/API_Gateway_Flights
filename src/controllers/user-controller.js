const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse} = require('../utils/common');
const { StatusCodes } = require('http-status-codes');
/*
POST : /signup
req-body : {name: 'user@mail.com',password : 'Sarique&123'}
*/

async function signup(req,res) {
    try {
        const user = await UserService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        SuccessResponse.message = 'Successfully created an User and signUp';
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}


/*
POST : /signin
req-body : {name: 'user@mail.com',password : 'Sarique&123'}
*/

async function signin(req,res) {
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        SuccessResponse.message = 'Successfully signIn';
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}


module.exports = {
    signup,
    signin
}