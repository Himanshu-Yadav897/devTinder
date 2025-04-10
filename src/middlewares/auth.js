const auth = (req, res, next) => {
  console.log("Auth Middleware called");
  let text = "xyz";
  let isAuth = text === "xyz";
  if (!isAuth) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
};

module.exports = auth;
