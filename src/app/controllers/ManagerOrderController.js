class ManagerOrderController {
    // [Get] /news
    index(req, res) {
        res.render('managerOrder', {
            userId: req.session.userId,
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
        });
    }
}

module.exports = new ManagerOrderController();
