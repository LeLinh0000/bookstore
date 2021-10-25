const Publisher = require('../../models/Publisher.model');

class PublisherController {
    index(req, res, next) {
        if (req.params.id_tacgia) {
            Publisher.getPublisherById(
                req.params.id_tacgia,
                function (err, rows) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(rows);
                    }
                },
            );
        } else {
            Publisher.getAllPublishers(function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            });
        }
    }

    delete(req, res, next) {
        Publisher.deletePublisher(req.params.idsp, function (err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }

    add(req, res, next) {
        // req.headers['Content-Type'] = 'application/json';
        Publisher.addPublisher(req.body, function (err, count) {
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
        Publisher.updatePublisher(
            req.params.idsp,
            req.body,
            function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            },
        );
    }
}

module.exports = new PublisherController();
