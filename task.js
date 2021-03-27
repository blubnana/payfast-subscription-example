const moment = require('moment');

exports.respond = (method, api_version, api_message, resultCode) => {
    return {
        "message": api_message, 
        "timestamp": moment().format('MMMM Do YYYY, h:mm:ss a'), 
        "code": resultCode, 
        "version": api_version, 
        "method": method
    }
}