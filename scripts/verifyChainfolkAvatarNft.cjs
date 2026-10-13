require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const hre = require('hardhat');
const { createPublicClient, http } = require('viem');

const deploymentFile = process.argv[2] || 'deployments/ChainfolkAvatarNft.botMainnet.json';

const deployment = JSON.parse(fs.readFileSync(path.resolve(deploymentFile), 'utf8'));

const networkConfig = {
  'bot-chain': {
    id: 677,
    rpcUrl: 'https://rpc.botchain.ai',
    deployTxEnv: 'BOT_CHAIN_MAINNET_DEPLOY_TXN_HASH',
  },
  'bot-chain-testnet': {
    id: 968,
    rpcUrl: 'https://rpc.bohr.life',
    deployTxEnv: 'BOT_CHAIN_TESTNET_DEPLOY_TXN_HASH',
  },
};

async function getConstructorOwner() {
  const explicitOwner = process.env.DEPLOYER_ADDRESS;
  if (explicitOwner) return explicitOwner;

  const config = networkConfig[hre.network.name];
  if (!config) throw new Error(`Unsupported verification network: ${hre.network.name}`);

  const deploymentTxHash = process.env[config.deployTxEnv];
  if (!deploymentTxHash) {
    throw new Error(`Missing ${config.deployTxEnv}; set DEPLOYER_ADDRESS or the deployment transaction hash in .env`);
  }

  const client = createPublicClient({
    chain: {
      id: config.id,
      name: hre.network.name,
      nativeCurrency: { name: 'BOT', symbol: 'BOT', decimals: 18 },
      rpcUrls: { default: { http: [config.rpcUrl] } },
    },
    transport: http(config.rpcUrl),
  });
  const transaction = await client.getTransaction({ hash: deploymentTxHash });
  if (transaction.to !== null) throw new Error('The configured transaction is not a contract-creation transaction');

  // The deployment script passes the deployer account as initialOwner.
  return transaction.from;
}

async function main() {
  const owner = await getConstructorOwner();
  await hre.run('verify:verify', {
    address: deployment.address,
    contract: 'contracts/ChainfolkAvatarNft.sol:ChainfolkAvatarNft',
    constructorArguments: [owner],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
