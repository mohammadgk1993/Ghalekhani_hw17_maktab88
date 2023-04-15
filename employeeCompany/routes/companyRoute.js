const express = require("express");
const router = express.Router();

// controllers
const { 
    createCompany,
    getAllCompanies,
    readCompany,
    deleteCompany,
    updateCompany,
    companyPage,
} = require("../controllers/companyController")

const { createCompanyValidator } = require("../middlewares/validators/companyValidators")

router.post("/", createCompanyValidator,createCompany);

router.get("/all", getAllCompanies);

router.get("/:id", readCompany)

router.delete("/:id", deleteCompany)

router.patch("/:id" , updateCompany)

router.get("/page/:filter" , companyPage)

module.exports = router;