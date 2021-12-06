const open = 'menu-open';
const active = 'active';

class AdminController {
    // [Get] /
    index(req, res) {
        res.render('adminTMDTHome.hbs', {
            layout: 'adminTMDT.hbs',
            home: 'active',
        });
    }

    product(req, res) {
        res.render('adminProduct.hbs', {
            layout: 'adminTMDT.hbs',
            p: 'menu-open',
            pa: 'active',
        });
    }

    // addBook(req, res) {
    //     res.render('adminAddBook.hbs', {
    //         layout: 'admin.hbs',
    //         qls: 'menu-open',
    //         ts: 'active',
    //     });
    // }

    category(req, res) {
        res.render('adminTMDTCategory.hbs', {
            layout: 'adminTMDT.hbs',
            qldm: 'menu-open',
            qldma: 'active',
        });
    }

    // author(req, res) {
    //     res.render('adminBookAuthor.hbs', {
    //         layout: 'admin.hbs',
    //         qldm: 'menu-open',
    //         dmtg: 'active',
    //     });
    // }

    // translator(req, res) {
    //     res.render('adminBookTranslator.hbs', {
    //         layout: 'admin.hbs',
    //         qldm: 'menu-open',
    //         dmnd: 'active',
    //     });
    // }

    // publisher(req, res) {
    //     res.render('adminBookPublisher.hbs', {
    //         layout: 'admin.hbs',
    //         qldm: 'menu-open',
    //         dmnxb: 'active',
    //     });
    // }

    // order(req, res) {
    //     res.render('adminOrder.hbs', {
    //         layout: 'admin.hbs',
    //         qldh: 'menu-open',
    //         dh: 'active',
    //     });
    // }

    // manager(req, res) {
    //     res.render('adminManager.hbs', {
    //         layout: 'admin.hbs',
    //         qltk: 'menu-open',
    //         tk: 'active',
    //     });
    // }
}

module.exports = new AdminController();
