class ProductsController {
    index(req, res, next) {
        res.render('products');
    }

    details_product(req, res, next) {
        res.render('details_product');
    }
}

module.exports = new ProductsController();
