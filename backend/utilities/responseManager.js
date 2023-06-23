const { validationResult } = require("express-validator");

exports.onSuccess = (message, result, res) => {
    res.status(200).json({
        Message: message,
        Data: result,
        Status: 200,
        IsSuccess: true
    });
};

exports.badrequest = (error, res) => {
    res.status(400).json({
        Message: error.message,
        Data: 0,
        Status: 400,
        IsSuccess: false
    });
};

exports.schemaError = async (msg, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
         res.status(422).json({
            Message: msg,
            Data: 0,
            Status: 422,
            IsSuccess: false
        });
    // } else {
    //     return true;
    // }
};