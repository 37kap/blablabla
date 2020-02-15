const fs = require('../utils/fs');
const db = require('../db/files');
const configFiles = require('../config/constants');

const ignoredFiles = configFiles.ignoredFiles.map(item => item.toLowerCase());

// нужно добавить ещу кетчей
const deleteRedundantFiles = () => {
    db.getAllFiles()
        .then(filesFromDb => {
            fs.readdir(configFiles.uploadsFolder).then(filesFromFs => {
                let filesForDeletion = compareFileNames(
                    filesFromDb,
                    filesFromFs
                );
                filesForDeletion.forEach(file => {
                    fs.unlink(configFiles.uploadsFolder + file);
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
};

const compareFileNames = (fileNames, files) => {
    let filesToDelete = files.filter(item => {
        if (
            !fileNames.includes(item.toLowerCase()) &&
            !ignoredFiles.includes(item.toLowerCase())
        ) {
            return item;
        }
    });
    return filesToDelete;
};

module.exports = { deleteRedundantFiles };
