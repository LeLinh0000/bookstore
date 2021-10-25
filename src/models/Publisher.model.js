const db = require('../common/connect');

var Publisher = {
    getAllPublishers: function (callback) {
        let sql = 'SELECT * FROM nhaxuatban';
        return db.query(sql, callback);
    },

    getPublisherById: function (id_nhaxuatban, callback) {
        let sql = `SELECT * FROM nhaxuatban WHERE id_tacgia = ${id_nhaxuatban}`;
        return db.query(sql, callback);
    },

    addPublisher: function (publisher, callback) {
        let sql = `INSERT INTO nhaxuatban() value('${publisher}')`;

        return db.query(sql, callback);
    },

    deletePublisher: function (id_nhaxuatban, callback) {
        let sql = `DELETE FROM nhaxuatban WHERE idsp = ${id_nhaxuatban}`;
        return db.query(sql, callback);
    },

    updatePublisher: function (id_nhaxuatban, publisher, callback) {
        let sql = `UPDATE nhaxuatban SET ten_nhaxuatban = ${publisher} WHERE id_nhaxuatban=${id_nhaxuatban}`;

        return db.query(sql, callback);
    },
};

module.exports = Publisher;
