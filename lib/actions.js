const d3Scale = require('d3-scale');
const { updateGroup, updateLight } = require('../lib/bridge-api');
const { wait, forEachLight } = require('../lib/utils');

const briScale = d3Scale.scaleLinear()
  .rangeRound([1, 255])
  .clamp(true)
  .nice();

module.exports = {
  pulseGroupLowToHigh: async ({
    hi=255,
    lo=1,
    holdHi=4000,
    holdLo=4000,
    transitionHi=1000,
    transitionLo=1000,
    actionHi,
    actionLo
  }={}) => {
    await updateGroup({
      bri: lo,
      transitiontime: Math.round(transitionLo/100)
    });
    if(typeof actionLo === 'function'){
      await actionLo();
    } else {
      await wait(holdLo);
    }
    await updateGroup({
      bri: hi,
      transitiontime: Math.round(transitionHi/100)
    });
    if(typeof actionHi === 'function'){
      await actionHi();
    } else {
      await wait(holdHi);
    }
  },
  // keep all lights at base state while highlighting one, then highlighting the next,
  // and returning the first to base state, and so on...
  cascade: async ({highlight, base, delay=1000, reverse, loop}) => {
    return await forEachLight(
      async ({current, prev}) => {
        await Promise.all([
          highlight({current}),
          base({prev})
        ]);
        await wait(delay);
      },
      {
        reverse,
        loop
      }
    );
  },
  flickerLight: async (light, { count=40, delay=10, transitiontime=0 }={}) => {
    for(var i=0; i<count; i++){
      await updateLight(
        light,
        {
          bri: briScale(Math.random()),
          transitiontime
        }
      );
      if(i < count){
        await wait(10);
      }
    }
  }
}
