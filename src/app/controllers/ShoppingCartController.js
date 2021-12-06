class ShoppingCartController {
    index(req, res, next) {
        res.render('shoppingCart', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }
}

module.exports = new ShoppingCartController();
