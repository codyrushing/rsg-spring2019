const d3Scale = require('d3-scale');
const { updateLight, updateGroup } = require('./bridge-api');
const { pulseGroupLowToHigh } = require('./actions');
const { LIGHTS, colors } = require('./config');

const { baseBlue, magenta } = colors;

const tweenTime = 120 * 1000;

const durationScale = d3Scale.scaleLinear()
  .domain([0, tweenTime])
  .range([4000, 400]) // slowest to fastest
  .clamp(true);

const hueScale = d3Scale.scalePow()
  .domain([0, tweenTime])
  // blue to magenta
  .range([baseBlue.hue, magenta.hue])
  .clamp(true);

const satScale = d3Scale.scaleLinear()
  .domain([0, tweenTime])
  // slightly desaturate
  .range([baseBlue.sat, magenta.sat])
  .clamp(true);

const lightScale = d3Scale.scaleQuantize()
  .domain([0, 1])
  .range(LIGHTS);

const colorScale = d3Scale.scaleQuantize()
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
    await updateGroup({
      ...colors.baseBlue,
      bri: 200
    });
    while(true){
      let ms = Date.now() - start;
      let duration = durationScale(ms);

      let targetColor = {
        hue: Math.round(hueScale(ms)),
        sat: Math.round(satScale(ms))
      };

      // 1/12 chance of an altered light
      if(Math.random()<0.0833){
        alteredLight = lightScale(Math.random());
        await updateLight(
          alteredLight,
          {
            ...colorScale(Math.random()),
            transitiontime: 0
          }
        );
      }

      // duration decreases with time, so pulses accelerate
      const pulseParams = {
        hi: 200,
        lo: 50,
        holdHi: duration,
        holdLo: duration,
        transitionHi: duration/4,
        transitionLo: duration/4
      };

      if(ms < tweenTime){
        pulseParams.actionLo = async () => {
          let ms = Date.now() - start;
          targetColor = {
            hue: Math.round(hueScale(ms)),
            sat: Math.round(satScale(ms))
          };
          await updateGroup({
            ...targetColor,
            transitiontime: Math.round(duration/100)
          });
        };
      }

      await pulseGroupLowToHigh(pulseParams);

      // if there is an altered light from a previous iteration, set it back to base blue
      if(alteredLight){
        await updateLight(
          alteredLight,
          {
            ...targetColor,
            transitiontime: 0
          }
        );
        alteredLight = null;
      }
    }
  }
  catch(err) {
    console.error(err);
  }
})();
