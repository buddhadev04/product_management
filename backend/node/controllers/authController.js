const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "No user found" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }
    
            const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
    
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ error: "Error signing in", details: error.message });
        }
    }
    

    async changePassword(req, res) {
    try {
        const { email, oldPassword, newPassword } = req.body;
        console.log("req.body", req.body);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: "Password updated successfully. Please log in again." });
    } catch (error) {
        res.status(500).json({ error: "Error updating password", details: error.message });
    }
}




  async signUp(req, res) {
        try {
            const { email, password } = req.body;

            const existingAdmin = await User.findOne();
            if (existingAdmin) {
                return res.status(400).json({ message: "Admin already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const admin = new User({ email, password: hashedPassword });
            await admin.save();

            res.status(201).json({ message: "Admin registered successfully. You can now sign in." });
        } catch (error) {
            res.status(500).json({ error: "Error signing up", details: error.message });
        }
    }

}

module.exports = new AuthController();
