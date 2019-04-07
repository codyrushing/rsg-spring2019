const { LIGHTS } = require('../config');

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
  forEachLight: async (fn, { loop, reverse }={} ) => {
    let lights = LIGHTS;
    if(loop){
      lights = lights.concat([
        LIGHTS[LIGHTS.length-2],
        LIGHTS[LIGHTS.length-3]
      ]);
    }
    if(reverse){
      lights.reverse();
    }
    for(let i=0; i<lights.length; i++){
      let current = lights[i];
      let prev = i > 0
        ? lights[i-1]
        : lights[lights.length - 1];
      let next = i < lights.length - 1
        ? lights[i+1]
        : lights[0];
      await fn({current, prev, next, i});
    }
  }
}
