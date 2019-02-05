const { updateGroup } = require('./bridge-api');
const { iterate, pulseGroupLowToHigh } = require('./utils');

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
      transitiontime: 10
    });
  }
  catch(err) {
    console.error(err);
  }
})();
