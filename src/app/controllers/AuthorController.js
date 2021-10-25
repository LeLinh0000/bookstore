const Author = require('../../models/Author.model');

class AuthorController {
    // Test
    formAdd(req, res, next) {
        res.render('formAddBook');
    }

    index(req, res, next) {
        if (req.params.id_tacgia) {
            Author.getAuthorById(req.params.id_tacgia, function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        } else {
            Author.getAllAuthors(function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        }
    }

    delete(req, res, next) {
        Author.deleteAuthor(req.params.idsp, function (err, count) {
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

module.exports = new AuthorController();
