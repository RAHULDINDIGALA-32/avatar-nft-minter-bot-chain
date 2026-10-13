# Chainfolk Avatar NFTs

Production NFT minting application for **Chainfolk Avatar NFTs**, an ERC-721 collection deployed on BOT Chain testnet and mainnet.

The project combines an OpenZeppelin ERC-721 contract, BOT Chain network support, Pinata IPFS storage, and a Next.js frontend using Wagmi, Viem, and RainbowKit. Minting is public and gas-only: there is no per-wallet cap and no total-supply cap. Each successful mint creates a new token and the minter pays only the network transaction fee.

## Live application and contracts

- Live site: [avatar-nft-minter-bot-chain.vercel.app](https://avatar-nft-minter-bot-chain.vercel.app)
- Source repository: [github.com/RAHULDINDIGALA-32/avatar-nft-minter-bot-chain](https://github.com/RAHULDINDIGALA-32/avatar-nft-minter-bot-chain)

## Live networks

| Network | Chain ID | RPC | Explorer |
| --- | ---: | --- | --- |
| BOT Chain Testnet | `968` | `https://rpc.bohr.life` | [Contract `0xb5b8...8b0b`](https://scan.bohr.life/address/0xb5b8f468f22a78462726c82f70175bb067148b0b) |
| BOT Chain Mainnet | `677` | `https://rpc.botchain.ai` | [Contract `0x2423...8868`](https://scan.botchain.ai/address/0x24238897439b1ae07cb1a576ce2d9b26d12e8868) |

Deployed contract addresses and ABIs are recorded in [`deployments/`](deployments/) and [`app/contractDeployments/`](app/contractDeployments/). The frontend selects the correct contract using the connected chain ID and its public environment configuration.
 
## Repository structure

```text
contracts/                          Solidity contracts
scripts/uploadToPinata.mjs          Upload images and metadata to Pinata
scripts/deployChainfolkAvatarNft.ts Deploy the ERC-721 contract
scripts/exportArtifact.mjs          Export the deployment artifact
src/networks.ts                     BOT Chain definitions for deployment
deployments/                        Root-project deployment records
nfts/images/                        Source NFT images
nfts/metadata/                      Source NFT metadata JSON files
app/                                Next.js frontend
app/src/app/data/nftsData.ts        Generated frontend NFT catalog
app/contractDeployments/            Frontend deployment records
```

## Prerequisites

- Node.js 20 or newer
- npm
- A BOT Chain wallet funded with BOT for deployment and testing
- A Pinata account and JWT for IPFS uploads
- A WalletConnect/Reown project ID for wallet connection UI

Install dependencies in both workspaces:

```bash
npm install
cd app
npm install
cd ..
```

## Environment configuration

Create a root `.env` for deployment and upload tooling. Use [`.env.example`](.env.example) as the template:

```env
DEPLOYER_PRIVATE_KEY=0x...
PINATA_JWT=...
PUBLIC_APP_URL=https://your-project.vercel.app
```

Create `app/.env.local` for the Next.js frontend:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
NEXT_PUBLIC_CHAINFOLK_TESTNET_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CHAINFOLK_MAINNET_CONTRACT_ADDRESS=0x...
```

`PUBLIC_APP_URL` is written into NFT metadata as `external_url`, so set it to the final frontend URL before uploading. Only variables prefixed with `NEXT_PUBLIC_` are exposed to browser code. Contract addresses and project IDs are public; private keys, Pinata JWTs, and other credentials are not.

## NFT content workflow

Place source images in `nfts/images/` and one matching JSON file per NFT in `nfts/metadata/`:

```text
nfts/
|- images/cold-wallet-monk.png
`- metadata/chain-folk-01.json
```

Before upload, metadata references the local filename:

```json
{
  "name": "Chainfolk Avatar #1",
  "description": "A Chainfolk Avatar NFT.",
  "image": "cold-wallet-monk.png",
  "external_url": "https://your-project.vercel.app",
  "attributes": [
    { "trait_type": "Archetype", "value": "Monk" }
  ]
}
```

Run the uploader from the repository root:

```bash
npm run upload
```

The upload script uploads images to Pinata, validates every image reference, replaces the local filename with a Pinata gateway URL, adds `external_url`, uploads the final metadata JSON, generates [`app/src/app/data/nftsData.ts`](app/src/app/data/nftsData.ts), and writes a local manifest. Keep metadata immutable after minting. For corrections, upload new metadata and document whether a new token should be minted.

## Smart contract

The contract is [`contracts/ChainfolkAvatarNft.sol`](contracts/ChainfolkAvatarNft.sol).

- ERC-721 compatible
- Name: `Chainfolk Avatar NFTs`
- Symbol: `CFNFT`
- Public `mint(string tokenUri)` function
- Each call creates a new token ID
- No mint price beyond gas
- No per-wallet cap or total-supply cap
- Token-specific IPFS metadata URI
- Owner-controlled pause and unpause functions

The contract does not know about local files or the Pinata account. The frontend passes the selected item's final IPFS metadata URL to `mint(tokenURI)`. The same wallet may mint the same catalog item repeatedly because URI uniqueness is not enforced by the contract.

## Compile and deploy

Compile Solidity and export the artifact used by the deployment script:

```bash
npm run compile
```

Deploy to either network:

```bash
npm run deploy:testnet
npm run deploy:mainnet
```

Deployment records are written to both deployment directories. After a deployment, update the matching Vercel/frontend variable and redeploy:

```env
NEXT_PUBLIC_CHAINFOLK_TESTNET_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CHAINFOLK_MAINNET_CONTRACT_ADDRESS=0x...
```

Testnet and mainnet have independent contracts, token IDs, and state. A contract name cannot be changed after deployment; a renamed contract requires a new deployment.

## Run the frontend

From `app/`:

```bash
npm run dev
```

Open `http://localhost:3000` and connect a wallet configured for BOT Chain. For production:

```bash
npm run build
npm start
```

Vercel must define the same `NEXT_PUBLIC_*` variables as local development. Changing a public environment variable requires a new frontend deployment because Next.js embeds it during build.

## Mint flow

1. The user connects a wallet.
2. The frontend detects BOT Chain testnet or mainnet.
3. The user selects an NFT catalog item.
4. The frontend calls `mint(tokenURI)` on the configured contract.
5. The wallet requests gas approval.
6. The contract mints the next token ID to `msg.sender`.
7. The token points to immutable IPFS metadata.
8. The transaction and token can be inspected in BOTScan.

## Security and operations

- Use a dedicated deployer wallet with only the funds needed for deployment.
- Never commit `.env`, `.env.local`, private keys, Pinata JWTs, or wallet connection secrets.
- Immediately rotate any credential exposed in logs, screenshots, terminals, or source control.
- Verify the chain ID, contract address, bytecode, and deployment transaction before mainnet use.
- Keep deployment JSON files under version control: addresses and ABIs are public operational records.
- Verify image and metadata CIDs before enabling public minting.
- Keep source artwork and metadata backed up outside build output.
- Treat gateway URLs as access paths; the canonical content identity is the IPFS CID.
- Test the complete upload, wallet, mint, and metadata-rendering flow on testnet before changing mainnet content.

## Git ignore policy

Git should ignore secrets, machine-specific files, dependencies, generated build output, and compiler caches. It should keep source code, deployment records, and reviewable NFT source files when licensing and repository size permit.

### Must be ignored

- `.env`, `.env.*`, and `app/.env.local`: credentials and local configuration
- `node_modules/`: installed dependencies
- `app/.next/`: Next.js build output
- `artifacts/`: Hardhat compiler output, bytecode, and generated artifacts
- `cache/`: Hardhat compiler cache
- `dist/` and other build directories
- Logs, debug reports, TypeScript build information, and editor-specific files
- `nfts/pinata-manifest.json`: generated upload output with environment-specific gateway URLs

### Normally committed

- `contracts/`, `scripts/`, and `app/src/`
- `package.json` and lockfiles
- `.env.example` with placeholders only
- `deployments/*.json` and `app/contractDeployments/*.json`
- `nfts/images/` and `nfts/metadata/`, if distribution rights allow it

If NFT source files are private or too large for Git, store them in controlled object storage and document the release process. Do not ignore deployment records merely because they are JSON: they identify public contracts and help reproduce the frontend configuration.

## Useful commands

```bash
npm run upload          # Upload NFT images and metadata to Pinata
npm run compile         # Compile Solidity and export the deployment artifact
npm run deploy:testnet  # Deploy ChainfolkAvatarNft to BOT Chain testnet
npm run deploy:mainnet  # Deploy ChainfolkAvatarNft to BOT Chain mainnet
npm test                # Run Hardhat tests, when tests are present

cd app
npm run dev             # Start the Next.js development server
npm run build           # Create a production frontend build
npm start               # Serve the production build
```

## License

This project is licensed under the [MIT License](LICENSE.txt). Copyright (c) 2025 Rahul Dindigala.

The MIT license applies to the project code unless a specific asset, artwork file, metadata record, or third-party dependency carries separate terms. Review the applicable rights before redistributing NFT artwork or metadata.

