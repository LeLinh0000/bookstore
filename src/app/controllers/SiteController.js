class SiteController {
    // [Get] /
    index(req, res) {
        res.render('home', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
            message: req.flash('registerSuccess'),
        });
    }

    // [GET] /products
    products(req, res) {
        res.render('products', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }
}

module.exports = new SiteController();
