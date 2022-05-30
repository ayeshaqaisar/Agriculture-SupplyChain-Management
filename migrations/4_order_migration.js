const order = artifacts.require("order");

module.exports = function (deployer) {
  deployer.deploy(order);
};
