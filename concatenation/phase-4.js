const { updateGroup, updateLight } = require('../lib/bridge-api');
const { flickerLight } = require('../lib/actions');
const { colors, LIGHTS } = require('../config');

(async function(){
  try {
    // avg seconds between flickers
    const avgSecsBetweenFlickers = 15;
    const intervalSecs = 3;
    const baseBrightness = 200;
    let flickerCount = 0;
    await updateGroup(
      { bri: baseBrightness }
    );
    setInterval(
      async () => {
        if(Math.random() <= intervalSecs/avgSecsBetweenFlickers){
          // flicker
          let light = LIGHTS[ flickerCount % LIGHTS.length ];
          await flickerLight(
            light,
            { count: 20 }
          );
          flickerCount++;
          updateLight(
            light,
            {
              bri: baseBrightness,
              transitiontime: 1
            }
          );
        }
      },
      intervalSecs * 1000
    );
  }
  catch(err){
    console.error(err);
  }
})();
