class OrderPageController {
    index(req, res, next) {
        res.render('order');
    }
}

module.exports = new OrderPageController();
