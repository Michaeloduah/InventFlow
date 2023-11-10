const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();
app.use(
  session({
    secret: "your-secret-key", // Replace with a secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

// Set Template Engine
app.set('view engine', 'ejs');

// Mount the routes
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
