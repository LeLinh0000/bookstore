const db = require('../common/connect');

var Author = {
    getAllAuthors: function (callback) {
        let sql = 'SELECT * FROM tacgia';
        return db.query(sql, callback);
    },

    getAuthorById: function (id_tacgia, callback) {
        let sql = `SELECT * FROM tacgia WHERE id_tacgia = ${id_tacgia}`;
        return db.query(sql, callback);
    },

    addAuthor: function (author, callback) {
        let sql = `INSERT INTO tacgia() value('${author}')`;

        return db.query(sql, callback);
    },

    deleteAuthor: function (id_tacgia, callback) {
        let sql = `DELETE FROM tacgia WHERE idsp = ${id_tacgia}`;
        return db.query(sql, callback);
    },

    updateAuthor: function (id_tacgia, author, callback) {
        let sql = `UPDATE tacgia SET ten_tacgia = ${author} WHERE id_tacgia=${id_tacgia}`;

        return db.query(sql, callback);
    },
};

module.exports = Author;
