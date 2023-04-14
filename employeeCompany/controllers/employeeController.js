const Employee = require("../model/employee");
const Company = require("../model/company");
const createError = require('http-errors');



const page = (req, res) => {
    res.render("pages/employeePage")
};


const createEmployee =  (req, res, next) => {
    const newEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        position: req.body.position,
        company: req.body.company
    });

    newEmployee.save()
    .then(savedEmployee => {

        savedEmployee.populate({path: "company", select: {__v: 0}})
        // Employee.populate(savedEmployee, {path: "company", select: {__v: 0}})
        .then(populatedSavedEmployee => {
            return res.json(populatedSavedEmployee);
        }).catch(err => {
            return next(createError(500, err.message));
        });
    })
    .catch(err => {
        return next(createError(500, err.message));
    });
};

const getByCompany = (req,res,next) => {
    Employee.find({company:req.params.id},{__v: 0,createdAt:0}).populate("company")
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    });
}

const readEmployee = (req,res,next) => {
    Employee.findOne({_id:req.params.id}).populate("company")
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    });
}

const deleteEmployee = (req,res,next) => {
    Employee.deleteOne({_id:req.params.id}).populate("company")
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    });
}

const updateEmployee = (req,res,next) => {
    const updatedEmployee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        position: req.body.position
    }

    Employee.updateOne({_id:req.params.id},updatedEmployee).populate("company")
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    });
}

const allEmployeePage = (req,res,next) => {
    Employee.find({company:req.params.filter},{__v: 0,createdAt:0}).populate("company")
    .then(employees => res.render("employee",{data:[...employees]}))
    .catch(err => {
        return next(createError(500, err.message));
    });
}

const singleEmployeePage = (req,res,next) => {
    Employee.findOne({_id:req.params.filter}).populate("company")
    .then(employee => res.render("employee",{data:[employee]}))
    .catch(err => {
        return next(createError(500, err.message));
    });
}

module.exports = {
    createEmployee,
    getByCompany,
    readEmployee,
    deleteEmployee,
    updateEmployee,
    allEmployeePage,
    singleEmployeePage
};