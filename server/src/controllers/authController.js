const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateEmail } = require('../utils/validators');

class AuthController {
    async register(req, res) {
        try {
            const { email, password } = req.body;

            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const user = new User({ email, password });
            await user.save();

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({ token, user: { email: user.email, role: user.role } });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ token, user: { email: user.email, role: user.role } });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }
}

module.exports = new AuthController();