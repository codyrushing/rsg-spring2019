const { updateGroup } = require('./bridge-api');
const { wait } = require('./utils');

const baseColor = {
  hue: 0,
  sat: 200
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
      bri: 80,
      transitiontime: 30
    });
  }
  catch(err){
    console.error(err);
  }
})();
