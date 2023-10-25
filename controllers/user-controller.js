const User = require("../modal/User");
const bcrypt = require("bcryptjs");
import bcrypt from "bcryptjs";
import User from "../modal/User";

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(422).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hashSync(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        const newUser = await user.save();
        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        next(error);
    }
};
