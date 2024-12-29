const logger = require('../utils/logger');

class ErrorHandlingService {
    constructor() {
        this.errorTypes = {
            VALIDATION_ERROR: 'ValidationError',
            AUTHENTICATION_ERROR: 'AuthenticationError',
            AUTHORIZATION_ERROR: 'AuthorizationError',
            TEST_EXECUTION_ERROR: 'TestExecutionError',
            AI_SERVICE_ERROR: 'AIServiceError',
        };
    }

    handleError(error, req, res) {
        logger.error('Error occurred:', error);

        switch (error.name) {
            case this.errorTypes.VALIDATION_ERROR:
                return res.status(400).json({
                    status: 'error',
                    type: 'ValidationError',
                    message: error.message,
                    details: error.details
                });

            case this.errorTypes.AUTHENTICATION_ERROR:
                return res.status(401).json({
                    status: 'error',
                    type: 'AuthenticationError',
                    message: 'Authentication failed'
                });

            case this.errorTypes.AUTHORIZATION_ERROR:
                return res.status(403).json({
                    status: 'error',
                    type: 'AuthorizationError',
                    message: 'Insufficient permissions'
                });

            case this.errorTypes.TEST_EXECUTION_ERROR:
                return res.status(500).json({
                    status: 'error',
                    type: 'TestExecutionError',
                    message: 'Test execution failed',
                    details: error.details
                });

            default:
                return res.status(500).json({
                    status: 'error',
                    type: 'InternalServerError',
                    message: 'An unexpected error occurred'
                });
        }
    }

    createError(type, message, details = null) {
        const error = new Error(message);
        error.name = type;
        error.details = details;
        return error;
    }
}

module.exports = new ErrorHandlingService();