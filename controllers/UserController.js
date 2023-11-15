const bcrypt = require("bcrypt");
const { User } = require("../models");
async function login(req, res, next) {
  try {
    res.render("homepage/login", { title: "Login" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function register(req, res, next) {
  try {
    res.render("homepage/register", { title: "Register"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function signup(req, res, next) {
  try {
    const { name, surname, username, email, phone, password, confirmpassword } =
      req.body;
    const image = req.file ? req.file.path : null;

    if (confirmpassword == password) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        surname,
        username,
        email,
        phone,
        image,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } else {
      $password_error = "Password Confirmation Failed";
      res.render({ message: $password_error });
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Handle validation errors
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      res.render("homepage/register", { errors: validationErrors });
    } else {
      console.error(error);
      res.status(500).render("error", { error: "Error registering user" });
    }
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Set up a session with user information
  req.session.user = user;

  // Redirect to the dashboard
  res.redirect("/dashboard");
}

module.exports = {
  login,
  register,
  signup,
  signin,
};
