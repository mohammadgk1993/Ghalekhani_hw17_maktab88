const createError = require('http-errors');
const Company = require('../model/company');
const Employee = require('../model/employee');


//CREATE
const createCompany = (req, res, next) => {
    const newCompoany = new Company({
        name: req.body.name,
        province: req.body.province,
        city: req.body.city,
        registerDate: req.body.registerDate,
        phoneNumber: req.body.phoneNumber
    });
    newCompoany.save()
    .then(savedCompany => res.json(savedCompany))
    .catch(err => {
        next(createError(500, "Server Error"))
    })
};


//READ
const readCompany = (req,res,next) => {
    Company.findOne({_id:req.params.id},{__v:0,updatedAt:0})
    .then(company => res.json([company]))
    .catch(err => {
        return next(createError(500, err.message));
    });
}


//READ ALL
const getAllCompanies = (req, res, next) => {
    Company.find({},{__v:0,updatedAt:0,createdAt:0})
    .then(companies => res.json(companies))
    .catch(err => {
        return next(createError(500, err.message));
    })
}


//DELETE
const deleteCompany = (req,res,next) => {
    Employee.deleteMany({company:req.params.id})
    .then(employees => employees)
    .catch(err => {
        return next(createError(500, err.message));
    });

    Company.deleteOne({_id:req.params.id})
    .then(company => res.json(company))
    .catch(err => {
        return next(createError(500, err.message));
    });
}


//UPDATE
const updateCompany = (req,res,next) => {
    const updatedCompany = {
    }

    if (req.body.name) updatedCompany.name = req.body.name
    if (req.body.province) updatedCompany.province = req.body.province
    if (req.body.city) updatedCompany.city = req.body.city
    if (req.body.registerDate) updatedCompany.registerDate = req.body.registerDate
    if (req.body.phoneNumber) updatedCompany.phoneNumber = req.body.phoneNumber

    Company.updateOne({_id:req.params.id},updatedCompany)
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    });
}


//PAGE
const companyPage = (req,res,next) => {
    if (req.params.filter == "all") {
        Company.find({},{__v:0,updatedAt:0})
        .then(companies => res.render("company",{data:companies}))
        .catch(err => {
            return next(createError(500, err.message));
        })
    } else {
        Company.findOne({_id:req.params.filter},{__v:0,updatedAt:0})
        .then(company => res.render("company",{data:[company]}))
        .catch(err => {
            return next(createError(500, err.message));
        });
    }
}


module.exports = {
    createCompany,
    getAllCompanies,
    readCompany,
    deleteCompany,
    updateCompany,
    companyPage
};