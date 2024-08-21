const userSchema = require('../models/userModel.js');


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Create a new user
        const user = await userSchema.create({ name, email, password });

        // Generate JWT token
        const token = user.getSignedJwtToken();

        // Send response with token
        res.status(201).json({ success: true, token });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Please provide an email and password" });
    }

    // Check for user
    const user = await userSchema.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = user.getSignedJwtToken();

    // Send response with token
    res.status(200).json({ success: true, token });
};


