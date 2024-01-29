const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create new user
    user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // check if password is correct
    let passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const data = {
      _id: user._id,
    };

    const authToken = jwt.sign(data, process.env.LOGIN_JWT, {
      expiresIn: "1m",
    });

    const { _id, username, email: useremail } = user;
    res.status(200).json({
      authToken,
      user: {
        _id,
        username,
        useremail,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const users = await User.find().select("_id username email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
