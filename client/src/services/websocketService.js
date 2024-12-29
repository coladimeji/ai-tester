import io from 'socket.io-client';

class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
    }

    connect() {
        this.socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:4000');

        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Set up default listeners
        this.setupDefaultListeners();
    }

    setupDefaultListeners() {
        this.socket.on('test-update', (data) => {
            this.notifyListeners('test-update', data);
        });

        this.socket.on('test-complete', (data) => {
            this.notifyListeners('test-complete', data);
        });

        this.socket.on('test-error', (data) => {
            this.notifyListeners('test-error', data);
        });
    }

    joinTestRoom(testId) {
        this.socket.emit('join-test-room', testId);
    }

    leaveTestRoom(testId) {
        this.socket.emit('leave-test-room', testId);
    }

    addListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
    }

    removeListener(event, callback) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(callback);
        }
    }

    notifyListeners(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => callback(data));
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default new WebSocketService();