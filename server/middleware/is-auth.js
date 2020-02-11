const jwt = require("jsonwebtoken");

module.exports = (req, _, next) => {
  req.isAuth = false;
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!authHeader || !token) return next();

  try {
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    if (decodedToken) {
      req.isAuth = true;
      req.userId = decodedToken.userId;
    }
  } catch (err) {
    console.log(err);
  }

  return next();
};
