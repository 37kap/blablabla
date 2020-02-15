const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

module.exports = {
    readdir,
    unlink
};
