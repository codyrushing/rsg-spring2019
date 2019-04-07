const { updateGroup } = require('../lib/bridge-api');

(async function(){
  try {
    await updateGroup(
      {
        on: true,
        ct: 350,
        bri: 50,
        transitiontime: 0
      }
    );
  }
  catch(err){
    console.error(err);
  }
})();
