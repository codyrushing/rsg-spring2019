const { updateGroup } = require('../lib/bridge-api');

(async function(){
  try {
    await updateGroup(
      {
        bri: 1,
        80
      }
    );
  }
  catch(err){
    console.error(err);
  }
})();
