const farmer = artifacts.require("farmer");

module.exports = function (deployer) {
  deployer.deploy(farmer);
};
