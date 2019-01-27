const { updateLight, updateGroup } = require('./bridge-api');
const { wait, iterate } = require('./utils');

const baseColor = {
  hue: 0,
  sat: 200
};


(async function(){
  try {
    await require('./phase-1')();
    process.exit();
  }
  catch(err){
    console.error(err);
  }
})();
