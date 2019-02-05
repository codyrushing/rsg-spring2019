const { updateGroup } = require('./bridge-api');
const { wait } = require('./utils');
const { colors } = require('./config');

(async function(){
  try {
    await updateGroup({
      ...colors.baseBlue,
      bri: 50,
      transitiontime: 0
    });
    await updateGroup({
      bri: 200,
      transitiontime: 30
    });
  }
  catch(err){
    console.error(err);
  }
})();
