const { updateGroup } = require('./bridge-api');
const { wait } = require('./utils');

const baseColor = {
  hue: 46920,
  sat: 255
};

(async function(){
  try {
    await updateGroup({
      ...baseColor,
      on: true,
      bri: 1,
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
