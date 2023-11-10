// middleware/authMiddleware.js
module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to the login page
      res.redirect("/login");
    }
  },

  isNotAuthenticated: (req, res, next) => {
    if (!req.session.user) {
      // User is not authenticated, allow access
      next();
    } else {
      // User is authenticated, redirect to the dashboard
      res.redirect("/dashboard");
    }
  },
};
