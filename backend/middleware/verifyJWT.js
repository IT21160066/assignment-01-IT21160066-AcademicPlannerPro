const jwt = require("jsonwebtoken");

/**
 * Verify token every time we made a request to protected middleware.
 */

const verifyJWT = (req, res, next) => {
  // Look at the authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check what is require to provide authorization header
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.userName = decoded.UserInfo.userName;
    req.roles = decoded.UserInfo.roles;
    req.userId = decoded.UserInfo.userId;
    next();
  });
};

module.exports = verifyJWT;
