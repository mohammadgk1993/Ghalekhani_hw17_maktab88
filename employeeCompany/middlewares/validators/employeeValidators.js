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
    if (req.body.firstName.length >= 100 || req.body.firstName.length < 3) {
        // return res.status(400).send("FirstName length must be between 3 and 100!")

        return next(createError(400, "FirstName length must be between 3 and 100!"))
    };

    // db search doc firstName === req.body.firstName
    // if exist ---> err if not exist ---> skip

    try {
        const existEmployee = await Employee.findOne({firstName: req.body.firstName});
        if (existEmployee) {
            return next(createError(400, "FirstName already exist"));
        };
    } catch(err) {
        return next(createError(500, "Server Error"));
    }


    // lastName validations
    if (!req.body.lastName) {
        return res.status(400).send("LastName is required!")
    };
    
    // age validations
    if (!req.body.age) {
        return res.status(400).send("Age is required!")
    };

    // position validations
    if (!req.body.position) {
        return res.status(400).send("Position is required!")
    };
    if (!["Backend Developer", "Client Developer", "Devops", "UI/UX Designer"].includes(req.body.position)) {
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