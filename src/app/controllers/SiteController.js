class SiteController {
    // [Get] /
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // [GET] /products
    products(req, res) {
        res.render('products');
    }
}

module.exports = new SiteController();
