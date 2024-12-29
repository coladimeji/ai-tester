const socketIO = require('socket.io');
const logger = require('../utils/logger');

class WebSocketService {
    initialize(server) {
        this.io = socketIO(server, {
            cors: {
                origin: process.env.CLIENT_URL || 'http://localhost:3000',
                methods: ['GET', 'POST']
            }
        });

        this.io.on('connection', (socket) => {
            logger.info(`Client connected: ${socket.id}`);

            socket.on('join-test-room', (testId) => {
                socket.join(`test-${testId}`);
            });

            socket.on('leave-test-room', (testId) => {
                socket.leave(`test-${testId}`);
            });

            socket.on('disconnect', () => {
                logger.info(`Client disconnected: ${socket.id}`);
            });
        });
    }

    emitTestUpdate(testId, data) {
        this.io.to(`test-${testId}`).emit('test-update', data);
    }

    emitTestComplete(testId, results) {
        this.io.to(`test-${testId}`).emit('test-complete', results);
    }

    emitTestError(testId, error) {
        this.io.to(`test-${testId}`).emit('test-error', error);
    }
}

module.exports = new WebSocketService();