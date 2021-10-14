class RegisterController {
    // [Get] /news
    index(req, res) {
        res.render('register');
    }
}

module.exports = new RegisterController();
