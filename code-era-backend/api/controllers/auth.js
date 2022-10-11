module.exports = {
  login(req, res, next) {
    res.status(200).send("Login");
  },
  signup(req, res, next) {
    res.status(201).send("Signup");
  },
};
