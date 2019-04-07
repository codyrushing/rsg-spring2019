const path = require('path')
const child_process = require('child_process');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

let subRoutine = null;

app.get(
  '/api/routine/:project?/:routineId',
  (req, res, next) => {
    try {
      if(subRoutine){
        subRoutine.kill();
      }
      const { project, routineId } = req.params;
      const routinePath = path.join('.', project, routineId);
      subRoutine = child_process.fork(routinePath);
      subRoutine.on('exit', () => console.log(`${routinePath} exited`));
      console.log(`Started ${routinePath}`);
      res.json({status: 'success'});
    }
    catch(err){
      console.error(err);
      next(err);
    }
  }
);

app.listen(8888, () => console.log(`App listening on 8888`));
