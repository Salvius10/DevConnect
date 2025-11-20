const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token, Authorization denied" });
    }

    // If token starts with "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id; // Save user id

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
