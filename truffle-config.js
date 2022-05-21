const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    rinkeby: {
      host: 'localhost',
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraKey}`
        );
      },
        
      network_id: 4,
      gas: 4500000,
    },
    develop: {
      port: 8545,
    },
  },
};
