const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.header("Authorization");

    // HARD STOP
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ msg: "No token provided" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Authentication failed" });
  }
};
