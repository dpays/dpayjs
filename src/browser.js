const api = require("./api");
const auth = require("./auth");
const broadcast = require("./broadcast");
const config = require("./config");
const formatter = require("./formatter")(api);
const utils = require("./utils");

const dpay = {
  api,
  auth,
  broadcast,
  config,
  formatter,
  utils
};

if (typeof window !== "undefined") {
  window.dpay = dpay;
}

if (typeof global !== "undefined") {
  global.dpay = dpay;
}

exports = module.exports = dpay;
