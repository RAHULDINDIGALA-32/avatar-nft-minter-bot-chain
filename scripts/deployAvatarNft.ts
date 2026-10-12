import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http, type Hex, publicActions } from 'viem';
import { botMainnet, botTestnet, type BotNetwork } from '../src/networks.js';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import artifact from '../artifacts/AvatarNft.json';

dotenv.config();
const networkName = process.argv[2] ?? 'botTestnet';
const network: BotNetwork = networkName === 'botMainnet' ? botMainnet : botTestnet;
const privateKey = process.env.DEPLOYER_PRIVATE_KEY as Hex | undefined;
if (!privateKey) throw new Error('Missing DEPLOYER_PRIVATE_KEY in .env');
if (!artifact.bytecode || artifact.bytecode === '0x') throw new Error('Missing compiled bytecode. Run npm run compile.');
const account = privateKeyToAccount(privateKey);
const client = createWalletClient({ account, chain: network, transport: http(network.rpcUrl) }).extend(publicActions);
async function main() {
  const hash = await client.deployContract({ abi: artifact.abi, bytecode: artifact.bytecode as Hex, args: [account.address] });
  const receipt = await client.waitForTransactionReceipt({ hash });
  if (!receipt.contractAddress) throw new Error('Deployment receipt did not contain a contract address');
  const deployment = { contractName: 'AvatarNft', address: receipt.contractAddress, chain: network.name, chainId: network.id, abi: artifact.abi, deployedAt: new Date().toISOString() };
  const fileName = `AvatarNft.${networkName}.json`;
  for (const directory of ['deployments', 'app/contractDeployments']) {
    fs.mkdirSync(path.join(process.cwd(), directory), { recursive: true });
    fs.writeFileSync(path.join(process.cwd(), directory, fileName), JSON.stringify(deployment, null, 2));
  }
  console.log(JSON.stringify({ network: network.name, chainId: network.id, address: receipt.contractAddress, txHash: hash }, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
