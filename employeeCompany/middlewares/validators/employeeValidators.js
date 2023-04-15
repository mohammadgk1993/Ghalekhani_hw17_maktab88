const createError = require('http-errors');
const Employee = require('../../model/employee');
const Company = require('../../model/company');



console.log(456);
async function createEmployeeValidator(req, res, next) {
    // firstName validations
    if (!req.body.firstName) {
        // return res.status(400).send("FirstName is required!");

        //better
        return next(createError(400, "FirstName is required!"))
    };
    if (typeof req.body.firstName !== "string") {
        // return res.status(400).send("FirstName must be string!");

        return next(createError(400, "FirstName must be string!"))
    };
    if (req.body.firstName.length >= 100 || req.body.firstName.length <= 3) {
        // return res.status(400).send("FirstName length must be between 3 and 100!")

        return next(createError(400, "FirstName length must be between 3 and 100!"))
    };


    // lastName validations
    if (!req.body.lastName) {
        // return res.status(400).send("lastName is required!");

        //better
        return next(createError(400, "lastName is required!"))
    };
    if (typeof req.body.lastName !== "string") {
        // return res.status(400).send("lastName must be string!");

        return next(createError(400, "lastName must be string!"))
    };

    if (req.body.lastName.length >= 100 || req.body.lastName.length <= 3) {
        // return res.status(400).send("lastName length must be between 3 and 100!")

        return next(createError(400, "lastName length must be between 3 and 100!"))
    };

    if (!req.body.gender) {
        return res.status(400).send("gender is required")
    }

    if (!["male","female"].includes(req.body.gender)) {
        return res.status(400).send("gender must either male or female")
    }
    
    // birth validations
    if (!req.body.birth) {
        return res.status(400).send("birth is required!")
    };

    if (Error(new Date(req.body.birth)) == 'Error: Invalid Date') {
        return res.status(400).send("birth is must be type of Date!")
    };

    if (!req.body.phoneNumber) {
        return res.status(400).send("phoneNumber is required!")
    }

    // position validations
    if (!req.body.position) {
        return res.status(400).send("Position is required!")
    };

    if (!["manager", "employee"].includes(req.body.position)) {
        return res.status(400).send("Bad value for position!")
    };

    try {
        const existCompany = await Company.findById(req.body.company);
        if (!existCompany) {
            return next(createError(404, "Company does not exist!"));
        };
    } catch(err) {
        return next(createError(500, "Server Error"));
    }

    next();
};


module.exports = {
    createEmployeeValidator
};