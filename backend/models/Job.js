const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true ,
        enum: ['cpp', 'py']
    },
    filepath: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    startedAt: {
        type: Date,
    },
    completedAt: {
        type: Date,
    },
    output: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'success', 'error'],
    }
})
const Job=new mongoose.model('Job',JobSchema);
module.exports = Job;