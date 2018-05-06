var EthereumApi = artifacts.require("./EthereumApi.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumApi);
};
