# BOT Avatar NFT

BOT Chain ERC-721 collection with Pinata IPFS metadata and a Next.js/Wagmi frontend.

Networks:

- Testnet: chain `968`, RPC `https://rpc.bohr.life`, explorer `https://scan.bohr.life`
- Mainnet: chain `677`, RPC `https://rpc.botchain.ai`, explorer `https://scan.botchain.ai`

## Workflow

1. Add matching files such as `nfts/images/avatar1.png` and `nfts/metadata/avatar1.json`.
2. Set `PINATA_JWT` in `.env` and run `npm run upload`.
3. Run `npm run compile`.
4. Deploy with `npm run deploy:testnet`.
5. Register the manifest with `npm run register:testnet`.
6. Set `NEXT_PUBLIC_BOT_TESTNET_CONTRACT_ADDRESS` in the app environment.

Repeat with the mainnet commands only after testnet acceptance. Testnet and mainnet have independent contracts and state. Keep `DEPLOYER_PRIVATE_KEY` and `PINATA_JWT` out of source control.
