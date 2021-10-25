const db = require('../common/connect');

var Book = {
    getAllBooks: function (callback) {
        let sql = 'SELECT * FROM sach';
        return db.query(sql, callback);
    },

    getBookById: function (idsach, callback) {
        let sql = `SELECT * FROM sach WHERE idsp = ${idsach}`;
        return db.query(sql, callback);
    },

    addBook: function (book, callback) {
        let sql =
            'INSERT INTO sach(TENSACH, GIA, TAP, HINHTHUCBIA, NGONNGU, SOTRANG, KICHTHUOC, NAMXUATBAN, tacgia, nhacungcap) value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [
            book.tensp,
            book.giabia,
            book.giaban,
            book.hinhthucbia,
            book.sotrang,
            book.kichthuoc,
            book.namxuatban,
            book.motasach,
            book.khuyenmai,
            book.tacgia,
            book.nhacungcap,
        ];

        return db.query(sql, data, callback);
    },

    deleteBook: function (idsp, callback) {
        let sql = `DELETE FROM sach WHERE idsp = ${idsp}`;
        return db.query(sql, callback);
    },

    updateBook: function (idsp, book, callback) {
        let sql =
            'UPDATE sach SET tensp=?, giabia=?, giaban=?, hinhthucbia=?, sotrang=?, kichthuoc=?, namxuatban=?, motasach=?, khuyenmai=?, tacgia=?, nhacungcap=? WHERE idsp=${idsp}';
        let data = [
            book.tensp,
            book.giabia,
            book.giaban,
            book.hinhthucbia,
            book.sotrang,
            book.kichthuoc,
            book.namxuatban,
            book.motasach,
            book.khuyenmai,
            book.tacgia,
            book.nhacungcap,
        ];
        return db.query(sql, data, callback);
    },
};

module.exports = Book;
