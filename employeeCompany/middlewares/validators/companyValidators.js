const createError = require('http-errors');
const Company = require('../../model/company');


console.log(456);
async function createCompanyValidator(req, res, next) {
    // name validations
    if (!req.body.name) {
        return next(createError(400, "name is required!"))
    };

    if (typeof req.body.name !== "string") {
        return next(createError(400, "name must be string!"))
    };

    if (req.body.name.length >= 30 || req.body.name.length <= 3) {
        return next(createError(400, "name length must be between 3 and 100!"))
    };


    try {
        const existCompany = await Company.findOne({name: req.body.name});
        if (existCompany) {
            return next(createError(400, "name already exist"));
        };
    } catch(err) {
        return next(createError(500, "Server Error"));
    }

    // province validations
    if (!req.body.province) {
        return next(createError(400, "province is required!"))
    }

    // city validations
    if (!req.body.city) {
        return next(createError(400, "city is required!"))
    }
    
    // registerDate validations
    if (!req.body.registerDate) {
        return next(createError(400, "registerDate is required!"))
    };

    if (Error(new Date(req.body.registerDate)) == 'Error: Invalid Date') {
        return next(createError(400, "registerDate is must be type of Date!"))
    };

    // phoneNumber validations
    if (!req.body.phoneNumber) {
        return next(createError(400, "phoneNumber is required!"))
    }

    next();
};


module.exports = {
    createCompanyValidator
};