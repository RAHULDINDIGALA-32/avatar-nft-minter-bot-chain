require('dotenv').config();
require('@nomicfoundation/hardhat-verify');

module.exports = {
  solidity: {
    version: '0.8.27',
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    'bot-chain': {
      url: 'https://rpc.botchain.ai',
      chainId: 677,
    },
    'bot-chain-testnet': {
      url: 'https://rpc.bohr.life',
      chainId: 968,
    },
  },
  etherscan: {
    apiKey: {
      'bot-chain': 'empty',
      'bot-chain-testnet': 'empty',
    },
    customChains: [
      {
        network: 'bot-chain',
        chainId: 677,
        urls: {
          apiURL: 'https://scan.botchain.ai/api',
          browserURL: 'https://scan.botchain.ai',
        },
      },
      {
        network: 'bot-chain-testnet',
        chainId: 968,
        urls: {
          apiURL: 'https://scan.bohr.life/api',
          browserURL: 'https://scan.bohr.life',
        },
      },
    ],
  },
  paths: { sources: './contracts', artifacts: './artifacts' },
};
