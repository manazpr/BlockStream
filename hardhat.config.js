require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
const { PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  paths: {
    artifacts: './src/artifacts',
  },
};
