const {constants} = require('../constants');
const errorHandler=(err,req,res,next)=>{
    const statusCode = res.statusCode?res.statusCode:500;
   switch(statusCode){
        case constants.NOT_FOUND:
            res.json({
                title:'not Found',
                message: err.message,
                stackTrace: err.stack
            });
        case constants.UNAUTHORIZED:
            res.json({
                title:'unauthorized',
                message: err.message,
                stackTrace: err.stack
            });
        case constants.FORBIDDEN:
            res.json({
                title:'frobidden',
                message: err.message,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            res.json({
                title:'frobidden',
                message: err.message,
                stackTrace: err.stack
            });    
        default:
            console.log('no Error,All Good')
            break;
        
   }
   
   
    res.json({});
};

module.exports = errorHandler;