const d3Scale = require('d3-scale');
const { updateLight } = require('./bridge-api');
const { pulseGroupLowToHigh } = require('./utils');
const { LIGHTS, colors } = require('./config');

const durationScale = d3Scale.scaleLinear()
  .domain([0, 1000 * 60 * 3])
  .range([8000, 400]) // slowest is 8 seconds, fastest is 0.4 seconds
  .nice(true) // integers only
  .clamp(true);

const lightScale = d3Scale.quantizeScale()
  .domain([0, 1])
  .range(LIGHTS);

const colorScale = d3Scale.quantizeScale()
  .domain([0, 1])
  .range(
    Object.keys(colors)
      .filter(k => k !== 'baseBlue')
      .map(k => colors[k])
  );

(async function(){
  try {
    const start = Date.now();
    let alteredLight = null;
    while(true){
      let ms = Date.now() - start;
      let duration = durationScale(ms);

      // if there is an altered light from a previous iteration, set it back to base blue
      if(alteredLight){
        await updateLight(
          alteredLight,
          {
            ...colors.baseBlue,
            transitiontime: 0
          }
        );
        alteredLight = null;
      }

      // duration decreases with time, so pulses accelerate
      await pulseGroupLowToHigh({
        holdHi: duration,
        holdLo: duration,
        transitionHi: duration/4,
        transitionLo: duration/4
      });

      // 1/12 chance of an altered light
      if(Math.random()<0.0825)){
        alteredLight = lightScale(Math.random());
        await updateLight(
          alteredLight,
          {
            ...colorScale(Math.random()),
            transitiontime: 0
          }
        );
      }
    }
  }
  catch(err) {
    console.error(err);
  }
})();
