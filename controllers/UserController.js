async function login(req, res, next) {
    try {
        res.render('homepage/login', { title: 'Login'})
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function register(req, res, next) {
    try {
        res.render('homepage/register', { title: 'Register'})
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    login,
    register,
}