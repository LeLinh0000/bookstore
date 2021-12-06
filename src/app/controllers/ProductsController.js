class ProductsController {
    index(req, res, next) {
        res.render('products', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }

    details_product(req, res, next) {
        fetch('http://localhost:3000/api/book/' + req.params.id)
            .then((response) => response.json())
            .then((data) => {
                res.render('details_product', data);
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new ProductsController();
