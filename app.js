const child_process = require('child_process');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

let subRoutine = null;

app.get(
  '/api/routine/:routineId',
  (req, res, next) => {
    try {
      if(subRoutine){
        subRoutine.kill();
      }
      subRoutine = child_process.fork(`./${req.params.routineId}`);
      subRoutine.on('exit', () => console.log(`${req.params.routineId} exited`));
      console.log(`Started ${req.params.routineId}`);
      res.json({status: 'success'});
    }
    catch(err){
      console.error(err);
      next(err);
    }
  }
);

app.listen(8888, () => console.log(`App listening on 8888`));
