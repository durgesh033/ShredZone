require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: String,
    email: { type: String, unique: true },
    password: String,
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Route to handle sign-up form submission
app.post('/signup', async (req, res) => {
    const { firstName, lastName, mobile, email, password } = req.body;

    // Validate fields
    if (!firstName || !lastName || !mobile || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = new User({
            firstName,
            lastName,
            mobile,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
