const d3Scale = require('d3-scale');
const { updateLight, updateGroup } = require('./bridge-api');
const { wait, iterate } = require('./utils');
const { cascade } = require('./actions');
const { LIGHTS, colors } = require('./config');

const { magenta, coolWhite, warmWhite, baseBlue } = colors;

const rampUpTime = 40 * 1000;

const delayScale = d3Scale.scaleLinear()
  .domain([0, rampUpTime])
  .range([300, 100])
  .clamp(true);

(async function(){
  try {
    const start = Date.now();
    await updateGroup({
      ...magenta,
      bri: 50
    });
    let reverse = false;
    let iterationsCount = 0;
    while(true){
      const ms = Date.now() - start;
      let delay = delayScale(ms);

      let isRampingUp = ms < rampUpTime;

      let transitiontime = isRampingUp
        ? Math.ceil(delay/100)
        : 0

      await cascade({
        highlight: async ({current}) => {
          return await updateLight(current, {
            bri: 200,
            transitiontime
          })
        },
        base: async({prev}) => {
          return await updateLight(prev, {
            bri: 50,
            transitiontime
          })
        },
        delay,
        loop: isRampingUp
      });

      if(Math.random() < 0.25){
        updateLight(LIGHTS[1], {
          bri: 50,
          transitiontime
        })
        await iterate(
          async () => {
            await updateLight(LIGHTS[0], {
              bri: 50,
              transitiontime: 0
            })
            await wait(delay);
            await updateLight(LIGHTS[0], {
              bri: 200,
              transitiontime: 0
            });
            await wait(delay);
          },
          Math.ceil(Math.random() * 3)
        );
      }


      if(!isRampingUp && Math.random() < 0.1){
        await updateGroup({
          bri: 1,
          transitiontime: 0,
          ...coolWhite
        });
        await wait(100);
        await updateGroup({
          transitiontime: 0,
          bri: 150,
        });
        await wait(100);
        // await updateGroup({
        //   bri: 1,
        //   transitiontime: 0
        // });
        // await wait(100);
        // await updateGroup({
        //   transitiontime: 0,
        //   bri: 150,
        //   ...coolWhite
        // });
        // await wait(100);
        await updateGroup({
          ...magenta,
          transitiontime: 0
        });
      }

      reverse = !reverse;
      iterationsCount += 1;
    }
  }
  catch(err) {
    console.error(err);
  }
})();
