const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: false,
    },
    poste: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    num: {
        type: String,
        required: false,
    },
    sexe: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    pays: {
        type: String,
        required: false,
    },
    codepos: {
        type: String,
        required: false,
    },
    salaire: {
        type: String,
        required: false,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Employee = (module.exports = mongoose.model("Employee", EmployeeSchema));
