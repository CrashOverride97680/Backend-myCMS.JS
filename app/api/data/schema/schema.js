// IMPORT MODULES NODEJS
const mongoose = require('mongoose');
const { Schema } = mongoose;
// EXPORTING MODULES WITH SCHEMA
module.exports = {
    users: new Schema({
        admin:
        {
            type: Boolean,
            required: true,
            default: false
        },
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        username:
        {
            type: String,
            required: true
        },
        name:
        {
            type: String,
            required: true
        },
        surname:
        {
            type: String,
            required: true
        },
        confirmed:
        {
            type: Boolean,
            required: true,
            default: false
        },
        create: { type: Date },
        updated: { type: Date, default: Date.now, required: true },
        modified: { type: Date, default: Date.now, required: true },
    }),
};