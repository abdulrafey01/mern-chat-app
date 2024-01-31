const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const b2 = require("../config/backblaze");
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.file);

    // check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // check if image is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    // Get the bucket information
    const bucketResponse = await b2.getBucket({
      bucketName: "Guftgu-Chat-app",
    });

    // Get the upload URL
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: bucketResponse.data.buckets[0].bucketId,
    });

    // Get profile image
    const profileImage = req.file;

    // Upload the file
    const uploadFileResponse = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: `${profileImage.originalname}`,
      data: profileImage.buffer,
      onUploadProgress: null,
    });

    const imageUrl = `https://Guftgu-Chat-app.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`;

    // create new user
    user = await User.create({
      username,
      email,
      password,
      avatar: imageUrl,
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

    const { _id, username, email: useremail, avatar } = user;
    res.status(200).json({
      authToken,
      user: {
        _id,
        username,
        useremail,
        avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const users = await User.find().select("_id username email avatar");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
