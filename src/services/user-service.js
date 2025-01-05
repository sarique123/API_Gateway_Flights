const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const UserRepository = require('../repositories/user-repository');
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((e)=>{
                explanation.push(e.message);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new User Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user = await userRepository.getUserByEmail(data.email);

        if(!user){
            throw new AppError('No user found for the given email',StatusCodes.NOT_FOUND);
        }

        const passwordMatch = Auth.checkPassword(data.password,user.password);

        if(!passwordMatch){
            throw new AppError('Invalid Password',StatusCodes.BAD_REQUEST);
        }

        const jwtToken = Auth.createToken({id: user.id, email: user.email});
        return jwtToken;
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            throw error;
        }
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createUser,
    signin
}