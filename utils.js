module.exports = {
  wait: async ms => new Promise(
    resolve => {
      if(isNaN(ms)){
        return resolve();
      }
      setTimeout(
        resolve,
        ms
      );
    }
  ),
  iterate: async (fn, count=1) => {
    for(let i=0; i<count; i++){
      await fn(i);
    }
  }
}
