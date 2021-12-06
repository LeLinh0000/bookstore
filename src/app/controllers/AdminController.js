const open = 'menu-open';
const active = 'active';

class AdminController {
    // [Get] /
    index(req, res) {
        res.render('adminHome.hbs', {
            layout: 'admin.hbs',
            home: 'active',
        });
    }

    books(req, res) {
        res.render('adminBooks.hbs', {
            layout: 'admin.hbs',
            qls: 'menu-open',
            tcs: 'active',
        });
    }

    addBook(req, res) {
        res.render('adminAddBook.hbs', {
            layout: 'admin.hbs',
            qls: 'menu-open',
            ts: 'active',
        });
    }

    category(req, res) {
        res.render('adminBookCategory.hbs', {
            layout: 'admin.hbs',
            qldm: 'menu-open',
            dmls: 'active',
        });
    }

    author(req, res) {
        res.render('adminBookAuthor.hbs', {
            layout: 'admin.hbs',
            qldm: 'menu-open',
            dmtg: 'active',
        });
    }

    translator(req, res) {
        res.render('adminBookTranslator.hbs', {
            layout: 'admin.hbs',
            qldm: 'menu-open',
            dmnd: 'active',
        });
    }

    publisher(req, res) {
        res.render('adminBookPublisher.hbs', {
            layout: 'admin.hbs',
            qldm: 'menu-open',
            dmnxb: 'active',
        });
    }

    order(req, res) {
        res.render('adminOrder.hbs', {
            layout: 'admin.hbs',
            qldh: 'menu-open',
            dh: 'active',
        });
    }

    manager(req, res) {
        res.render('adminManager.hbs', {
            layout: 'admin.hbs',
            qltk: 'menu-open',
            tk: 'active',
        });
    }
}

module.exports = new AdminController();
