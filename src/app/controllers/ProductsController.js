class ProductsController {
    index(req, res, next) {
        res.render('products', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }

    details_product(req, res, next) {
        fetch(
            'https://bookstore-backend-nodejs.herokuapp.com/api/book/' +
                req.params.id,
        )
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
