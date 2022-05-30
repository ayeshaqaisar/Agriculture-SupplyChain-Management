const customer = artifacts.require("customer");

module.exports = function (deployer) {
  deployer.deploy(customer);
};
