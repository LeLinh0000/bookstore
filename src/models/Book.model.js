const db = require('../common/connect');

var Book = {
    getAllBooks: function (callback) {
        let sql = 'SELECT * FROM sanpham';
        return db.query(sql, callback);
    },

    getBookById: function (idsp, callback) {
        let sql = `SELECT * FROM sanpham WHERE idsp = ${idsp}`;
        return db.query(sql, callback);
    },

    addBook: function (book, callback) {
        let sql =
            'INSERT INTO sanpham(tensp, giabia, giaban, hinhthucbia, sotrang, kichthuoc, namxuatban, motasanpham, khuyenmai, tacgia, nhacungcap) value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [
            book.tensp,
            book.giabia,
            book.giaban,
            book.hinhthucbia,
            book.sotrang,
            book.kichthuoc,
            book.namxuatban,
            book.motasanpham,
            book.khuyenmai,
            book.tacgia,
            book.nhacungcap,
        ];

        return db.query(sql, data, callback);
    },

    deleteBook: function (idsp, callback) {
        let sql = `DELETE FROM sanpham WHERE idsp = ${idsp}`;
        return db.query(sql, callback);
    },

    updateBook: function (idsp, book, callback) {
        let sql =
            'UPDATE sanpham SET tensp=?, giabia=?, giaban=?, hinhthucbia=?, sotrang=?, kichthuoc=?, namxuatban=?, motasanpham=?, khuyenmai=?, tacgia=?, nhacungcap=? WHERE idsp=${idsp}';
        let data = [
            book.tensp,
            book.giabia,
            book.giaban,
            book.hinhthucbia,
            book.sotrang,
            book.kichthuoc,
            book.namxuatban,
            book.motasanpham,
            book.khuyenmai,
            book.tacgia,
            book.nhacungcap,
        ];
        return db.query(sql, data, callback);
    },
};

module.exports = Book;
