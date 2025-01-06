const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
    const { userName, email, password } = req.body;
    
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "Email is already in use" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    user = await User.create({
        userName,
        email,
        password: hashedPassword,
    });
    
    let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

    return res.status(201).json({ token, user });
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
        let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ token, user });
    } else {
        return res.status(400).json({ error: "Invalid credentials" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ userName: user.userName, email: user.email, createdAt: user.createdAt });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const user = await User.findById(req.userId); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userName) user.userName = userName;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { userSignUp, userLogin, getUser, updateUser, deleteUser };
