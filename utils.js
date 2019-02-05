const { updateGroup } = require('./bridge-api');
const { LIGHTS } = require('./config');

const wait = async (ms) => new Promise(
  resolve => {
    if(isNaN(ms)){
      return resolve();
    }
    setTimeout(
      resolve,
      ms
    );
  }
)

module.exports = {
  wait,
  iterate: async (fn, count=1) => {
    for(let i=0; i<count; i++){
      await fn(i);
    }
  },
  forEachLight: async (fn) => {
    for(let i=0; i<LIGHTS.length; i++){
      let light = LIGHTS[i];
      let prev = i > 0
        ? LIGHTS[i-1]
        : LIGHTS[LIGHTS.length - 1];
      let next = i < LIGHTS.length - 1
        ? LIGHTS[i+1]
        : LIGHTS[0];
      await fn({light, prev, next, i});
    }
  },
  pulseGroupLowToHigh: async ({
    hi=255,
    lo=1,
    holdHi=4000,
    holdLo=4000,
    transitionHi=1000,
    transitionLo=1000
  }) => {
    await updateGroup({
      bri: lo,
      transitiontime: Math.round(transitionLo/100)
    });
    await wait(holdLo);
    await updateGroup({
      bri: hi,
      transitiontime: Math.round(transitionHi/100)
    });
    await wait(holdHi);
  },
  // keep all lights at base state while highlighting one, then highlighting the next,
  // and returning the first to base state, and so on...
  cascade: async ({highlight, base, delay=1000}) => {
    return await forEachLight(
      async ({light, prev}) => {
        await Promise.all([
          await highlight(light),
          await base(prev)
        ]);
        await wait(delay);
      }
    );
  },
}
