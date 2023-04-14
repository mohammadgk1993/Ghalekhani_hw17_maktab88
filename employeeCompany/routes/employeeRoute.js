const express = require("express");
const router = express.Router();

// controllers
const { 
    createEmployee,
    getByCompany,
    readEmployee,
    deleteEmployee,
    updateEmployee,
    allEmployeePage,
    singleEmployeePage
 } = require("../controllers/employeeController")

// validators
const { createEmployeeValidator } = require("../middlewares/validators/employeeValidators")


router.post("/", createEmployeeValidator, createEmployee);

router.get("/all/:id", getByCompany);

router.get("/:id", readEmployee)

router.delete("/:id", deleteEmployee)

router.patch("/:id", updateEmployee)

router.get("/page/all/:filter", allEmployeePage)

router.get("/page/:filter", singleEmployeePage)

module.exports = router;