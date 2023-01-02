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
        enum: ['pending', 'success', 'completed'],
        default: 'pending'
    }
})
const Job=new mongoose.model('Job',JobSchema);
module.exports = Job;