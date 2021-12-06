class OrderPageController {
    index(req, res, next) {
        res.render('order', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }
}

module.exports = new OrderPageController();
