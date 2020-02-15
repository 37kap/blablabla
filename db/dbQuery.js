const db = require('./dbConnection');

/**
 * получение данных из базы данных
 * @param {*} src - строка запроса
 */
const executeTheQuery = src => {
    return new Promise((resolve, reject) => {
        db.query(src, (err, rows, fields) => {
            if (err) {
                return reject(err)
            }
            resolve(rows);
        })
    })
}
/**
 * закрытие подключения
 */
const closeConnection = () => {
    db.end(function (err) {
        if (err) throw err;
        console.log('Подключение закрыто');
    });
}


module.exports.executeTheQuery = executeTheQuery;
module.exports.closeConnection = closeConnection;