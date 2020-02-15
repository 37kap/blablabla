const fs = require('fs');
const db = require('../db/dbQuery')
const configFiles = require('../config/constants');

const ignoredFiles = configFiles.ignoredFiles.map(item => item.toLowerCase());

const deleteRedundantFiles = () => {
    db.executeTheQuery(configFiles.getEcgRecordsQuery)
        .then(rows => {
            return rows.map(item => item.ecg_record.toLowerCase())
        })
        .then(dbFileNames => getFilesForDeletion(dbFileNames, configFiles.uploadsFolder))
        .then(filesToDelete => deleteFiles(filesToDelete))
        .catch((err) => {
            console.log(err)
        });

    db.closeConnection();
}

const getFilesForDeletion = (fileNames, folder) => {
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if (err) reject(err);
            else {
                resolve(compareFileNames(fileNames, files))
            }
        })
    })
}

const compareFileNames = (fileNames, files) => {
    let filesToDelete = files.filter(item => {
        if (!fileNames.includes(item.toLowerCase()) && !ignoredFiles.includes(item.toLowerCase())) {
            return item
        }
    })
    return filesToDelete
}

const deleteFiles = files => {
    files.forEach(file => {
        fs.unlink(configFiles.uploadsFolder + file, err => {
            if (err) throw err;
            console.log(`Удален файл ${file}`);
        });
    })
}

module.exports = deleteRedundantFiles;