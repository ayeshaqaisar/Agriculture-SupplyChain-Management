const distributor = artifacts.require("distributor");

module.exports = function (deployer) {
  deployer.deploy(distributor);
};
