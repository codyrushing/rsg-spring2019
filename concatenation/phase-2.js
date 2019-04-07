const { wait } = require('../lib/utils');
const { flickerLight } = require('../lib/actions');
const { LIGHTS } = require('../config');
const { updateGroup } = require('../lib/bridge-api');

(async function(){
  try {
    await Promise.all(
      LIGHTS.map(
        light => flickerLight(light, { count: 16 })
      )
    );
    await updateGroup(
      {
        bri: 200,
        transitiontime: 1
      }
    );
  }
  catch(err){
    console.error(err);
  }
})();
