const mongoose = require("mongoose");


const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        match: /^[a-zA-Z ,']+$/i
    },
    province: {
        type: String,
        default: "not-set",
        minLength: 3,
        maxLength: 30,
        trim: true,
        match: /^[a-zA-Z ,']+$/i
    },
    city : {
        type: String,
        defualt: "not-set",
        minLength: 3,
        maxLength: 30,
        trim: true,
        match: /^[a-zA-Z ,']+$/i
    },
    registerDate: {
        type: Date,
        required: true
    },
    phoneNumber:{
        type:[String],
        unique:true,
        validate: [
            {
            validator: arr => {
                return arr.every((num) => typeof num === "string");
            },
            message: "array items must be type of String"
        },
        {
            validator: arr => {
                return Array.isArray(arr);
            },
            message: "phoneNumber must be type of array of strings"
        },
        {
            validator: arr => {
                return arr.length > 0;
            },
            message: "at least 1 phone number required"
        },
        {
            validator: arr => {
                return arr.every(item => /^(\+98)9\d{9}$/.test(item));
            },
            message: "phone number must be format of : +98-9-???-??-??"
        },
        {
            validator: function(arr) {
                return arr.length === new Set(arr).size;
            },
            message: 'Names array must contain unique elements'
        }
    ]
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("company", CompanySchema);