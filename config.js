const yaml = require('js-yaml');
const fs = require('fs');
module.exports = {
  ...yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8')),
  colors: {
    baseBlue: {
      hue: 46920,
      sat: 255
    },
    magenta: {
      hue: 65280,
      sat: 200
    },
    yellow: {
      hue: 12750,
      sat: 200,
    },
    coolWhite: {
      ct: 153
    },
    warmWhite: {
      ct: 500
    }
  }
};
