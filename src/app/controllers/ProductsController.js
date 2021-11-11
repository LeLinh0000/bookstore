class ProductsController {
    index(req, res, next) {
        res.render('products', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }

    details_product(req, res, next) {
        res.render('details_product', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }
}

module.exports = new ProductsController();
