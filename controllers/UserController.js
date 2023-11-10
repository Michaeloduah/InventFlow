async function login(req, res, next) {
    try {
        res.render('homepage/login', { title: 'Login'})
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    login,
}