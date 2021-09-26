class NewsController {
    // [Get] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEW DETAIL');
    }
}

module.exports = new NewsController();
