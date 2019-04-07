const { colors } = require('../config');
const { updateGroup } = require('../lib/bridge-api');

(async function(){
  try {
    await updateGroup(
      {
        ...colors.warmWhite,
        bri: 200,
        transitiontime: 100
      }
    );
  }
  catch(err){
    console.error(err);
  }
})();
