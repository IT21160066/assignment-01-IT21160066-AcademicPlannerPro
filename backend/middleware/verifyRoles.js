const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return res.status(401).json({ message: "Roles not found" });
    console.log(allowedRoles);
    console.log(req.roles);

    const result = req.roles
      .map((role) => allowedRoles.includes(role))
      .find((val) => val === true);

    if (!result)
      return res.status(401).json({ message: "Allowed roles not found" });
    next();
  };
};

module.exports = verifyRoles;
