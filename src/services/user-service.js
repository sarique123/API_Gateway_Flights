const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const UserRepository = require('../repositories/user-repository');

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

module.exports = {
    createUser
}