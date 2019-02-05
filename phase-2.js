const { updateGroup } = require('./bridge-api');
const { iterate } = require('./utils');
const { pulseGroupLowToHigh } = require('./actions');

(async function(){
  try {
    // pulse 5 times
    await iterate(
      async (i) => await pulseGroupLowToHigh(),
      5
    );
    // back down to medium low
    await updateGroup({
      bri: 200,
      holdHi: 3000,
      holdLo: 3000,
      transitiontime: 10
    });
  }
  catch(err) {
    console.error(err);
  }
})();
