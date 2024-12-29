const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    testScript: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['passed', 'failed', 'error'],
        required: true,
    },
    results: {
        passed: Number,
        failed: Number,
        total: Number,
    },
    logs: [{
        level: String,
        message: String,
        timestamp: Date,
    }],
    executionTime: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('TestResult', testResultSchema);