const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const testController = require('../controllers/testController');
const auth = require('../middleware/auth');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Test routes
router.post('/test/execute', auth, testController.executeTest);
router.post('/test/generate', auth, testController.generateScript);
router.get('/test/results', auth, testController.getResults);

module.exports = router;