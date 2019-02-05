const { updateGroup } = require('./bridge-api');

(async function(){
  try {
    await updateGroup({
      on: true,
      bri: 50
    });
  }
  catch(err){
    console.error(err);
  }
})();
