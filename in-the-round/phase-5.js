const { updateGroup } = require('../lib/bridge-api');
const { wait } = require('../lib/utils');
const { colors } = require('../config');

(async function(){
  try {
    await updateGroup({
      ...colors.baseBlue,
      bri: 50,
      transitiontime: 50
    });
    await updateGroup({
      ...colors.baseBlue,
      bri: 1,
      transitiontime: 50
    })
  }
  catch(err){
    console.error(err);
  }
})();
