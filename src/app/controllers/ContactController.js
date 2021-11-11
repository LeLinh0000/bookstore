class ContactController {
    // [Get] /news
    index(req, res) {
        res.render('contact', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }
}

module.exports = new ContactController();
