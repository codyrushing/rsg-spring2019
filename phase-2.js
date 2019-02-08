const { updateGroup } = require('./bridge-api');
const { iterate } = require('./utils');
const { pulseGroupLowToHigh } = require('./actions');

(async function(){
  try {
    // pulse 5 times
    await iterate(
      async (i) => await pulseGroupLowToHigh({
        transitionHi: 3000,
        transitionLo: 3000,
        holdHi: 1000,
        holdLo: 1000,
      }),
      5
    );
    // back down to medium low
    await updateGroup({
      bri: 200,
      transitiontime: 10
    });
  }
  catch(err) {
    console.error(err);
  }
})();
