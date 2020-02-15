const db = require('./dbConnection');

/**
 * получение данных из базы данных
 * @param {*} src - строка запроса
 */
const executeTheQuery = src => {
    return new Promise((resolve, reject) => {
        db.query(src, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};
/**
 * закрытие подключения
 */
const closeConnection = () => {
    return new Promise((resolve, reject) => {
        this.connection.end(err => {
            if (err) return reject(err);
            console.log('Подключение закрыто');
            resolve();
        });
    });
};

module.exports = {
    executeTheQuery,
    closeConnection
};
