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
      res.cookie(String(user._id), token, {
        path: "/",
        httpOnly: true,
        maxAge: 3600000,
        expiresIn: new Date(Date.now() + 3600000),
        sameSite: "lax",
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
  
const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookies;
  if (!cookies) {
    return res.status(401).json({
      message: "cookies header not found",
    });
  }
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }
  jwt.verify(String(token), "secret_key", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
    req.userId = decodedToken.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.userId;
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "User found",
    user: user,
  });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
