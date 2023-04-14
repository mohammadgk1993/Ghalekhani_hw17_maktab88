const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true,
        enum: ["Backend Developer", "Client Developer", "Devops", "UI/UX Designer"]
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: "company",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('employee', EmployeeSchema);