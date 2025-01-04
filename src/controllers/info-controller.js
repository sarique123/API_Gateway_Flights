const { StatusCodes } = require('http-status-codes');

const info = (req,res) => {
    return res
            .status(StatusCodes.OK)
            .json({
                success : true,
                message : 'Server is now Live',
                error : {},
                data : {}
            });
};

module.exports = {
    info
}