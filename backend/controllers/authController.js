const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler"); // Pass errors to custom error-handler - to handle asynchronous functions

/**
 * This code implements authentication and token-based authorization using JSON Web Tokens
 */

// @desc Login
// @route POST /auth
// @access Public

const login = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ userName }).exec();

  if (!foundUser || !foundUser.activeStatus) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: foundUser._id,
        userName: foundUser.userName,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      userId: foundUser._id,
      userName: foundUser.userName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accessible only web server
    secure: true, // https
    sameSite: "None", // cross site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry set to match refreshToken
  });

  // Send back accessToken containing userName and roles
  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired

/**
 * Access token which (JWT) give us acceess had expire,
 * then only way to get new access token would be to have valid refresh token that send to
 * refresh end point.
 */

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  // If refresh token is valid provide another access token

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({ userName: decoded.userName });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id,
            username: foundUser.userName,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
