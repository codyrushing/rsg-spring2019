const { updateGroup } = require('./bridge-api');
const { wait, iterate } = require('./utils');

(async function(){
  try {
    await updateGroup({
      bri: 1,
      transitiontime: 30
    });

    await iterate(
      async () => {
        await updateGroup({
          bri: 1,
          transitiontime: 2
        });
        await wait(3000);
        await updateGroup({
          bri: 200,
          transitiontime: 2
        });
        await wait(3000);
      },
      5
    );

    await updateGroup({
      bri: 1,
      transitiontime: 10
    });

  }
  catch(err) {
    console.error(err);
  }
})();
