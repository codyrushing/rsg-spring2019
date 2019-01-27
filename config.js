const yaml = require('js-yaml');
const fs = require('fs');
module.exports = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
