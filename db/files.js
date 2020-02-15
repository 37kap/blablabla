const db = require('./dbQuery');

const getAllFilesQuery = 'SELECT ecg_record FROM schema.training';

const getAllFiles = () => {
    let results;
    return db
        .executeTheQuery(getAllFilesQuery)
        .then(rows => {
            // тут нужно добавить какую-то логику фильтрации, чтобы на выходе имень чисты объект с которым дальше будем работать
            results = rows.map(item => item.ecg_record.toLowerCase());
            return db.closeConnection();
        })
        .then(() => {
            return results;
        });
};

module.exports = {
    getAllFiles
};
