const mongoose = require("mongoose");


const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("company", CompanySchema);