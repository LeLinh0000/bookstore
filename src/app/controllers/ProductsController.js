const Book = require('../../models/Book.model');

class ProductsController {
    index(req, res, next) {
        if (req.params.idsp) {
            Book.getBookById(req.params.idsp, function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        } else {
            Book.getAllBooks(function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.render('products', { rows });
                }
            });
        }
    }

    delete(req, res, next) {
        Book.deleteBook(req.params.idsp, function (err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }

    add(req, res, next) {
        // req.headers['Content-Type'] = 'application/json';
        Book.addBook(req.body, function (err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(req.body);
                // console.log(req.body);
                // res.send('')
            }
        });
    }

    update(req, res, next) {
        Book.updateBook(req.params.idsp, req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
}

module.exports = new ProductsController();
