const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ id: user._id }, "secret_key", {
      expiresIn: "1hr",
    });
    res.status(200).json({
      message: "Login successful",
      user: user,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.signup = signup;
exports.login = login;
