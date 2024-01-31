exports.requireLogIn = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login First" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ message: "Invalid token. Please login again" });
    }
    next();
  } catch (error) {}
};
