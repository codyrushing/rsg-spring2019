const { updateGroup } = require('./bridge-api');

(async function(){
  try {
    await updateGroup({
      on: false,
      transitiontime: 0
    });
  }
  catch(err){
    console.error(err);
  }
})();
