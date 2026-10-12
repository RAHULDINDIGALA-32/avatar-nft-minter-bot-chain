import fs from 'node:fs/promises';
import process from 'node:process';
import dotenv from 'dotenv';
import { createPublicClient, createWalletClient, http, parseAbi, getContract } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { defineChain } from 'viem';
dotenv.config();
const networkName = process.argv[2] ?? 'botTestnet';
const network = networkName === 'botMainnet'
  ? defineChain({ id: 677, name: 'BOT Chain', nativeCurrency: { name: 'BOT', symbol: 'BOT', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.botchain.ai'] } } })
  : defineChain({ id: 968, name: 'BOT Chain Testnet', nativeCurrency: { name: 'BOT', symbol: 'BOT', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.bohr.life'] } } });
const deployment = JSON.parse(await fs.readFile(`deployments/AvatarNft.${networkName}.json`, 'utf8'));
const manifest = JSON.parse(await fs.readFile('nfts/pinata-manifest.json', 'utf8'));
const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
if (!privateKey) throw new Error('Missing DEPLOYER_PRIVATE_KEY in .env');
const account = privateKeyToAccount(privateKey);
const transport = http(network.rpcUrls.default.http[0]);
const wallet = createWalletClient({ account, chain: network, transport });
const publicClient = createPublicClient({ chain: network, transport });
const abi = parseAbi(['function registerToken(uint256 tokenId, string uri) external', 'function minted(uint256 tokenId) view returns (bool)']);
const contract = getContract({ address: deployment.address, abi, client: { public: publicClient, wallet } });
for (const item of manifest.sort((a, b) => a.tokenId - b.tokenId)) {
  if (await contract.read.minted([BigInt(item.tokenId)])) continue;
  const hash = await contract.write.registerToken([BigInt(item.tokenId), item.tokenURI]);
  await publicClient.waitForTransactionReceipt({ hash });
  console.log(`Registered token ${item.tokenId}: ${hash}`);
}
