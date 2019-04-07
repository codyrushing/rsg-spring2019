const axios = require('axios');
const { BRIDGE_HOST, BRIDGE_API_NAMESPACE } = require('../config');
const { wait } = require('../lib/utils');

const API_ROOT = `http://${BRIDGE_HOST}/api/${BRIDGE_API_NAMESPACE}`;

const waitForCompletion = async (transitiontime=4) => await wait(Math.round(transitiontime * 100));

module.exports = {
  updateGroup: async (payload, { exitEarly }={}) => {
    try {
      const response = await axios.put(
        `${API_ROOT}/groups/1/action`,
        payload
      );
      if(exitEarly){
        return response;
      }
      await waitForCompletion(payload.transitiontime);
      return response;
    }
    catch(err){
      console.error(err);
    }
  },
  updateLight: async (id, payload, { exitEarly }={}) => {
    try {
      const response = await axios.put(
        `${API_ROOT}/lights/${id}/state`,
        payload,
      );
      if(exitEarly){
        return response;
      }
      await waitForCompletion(payload.transitiontime);
      return response;
    }
    catch(err){
      console.error(err);
    }
  }
}
