# Chainfolk Avatar NFTs

BOT Chain ERC-721 collection with Pinata IPFS metadata and a Next.js/Wagmi frontend.

Networks:

- Testnet: chain `968`, RPC `https://rpc.bohr.life`, explorer `https://scan.bohr.life`
- Mainnet: chain `677`, RPC `https://rpc.botchain.ai`, explorer `https://scan.botchain.ai`

## Workflow

1. Add images to `nfts/images` and matching metadata JSON to `nfts/metadata`. The metadata `image` field must contain the local image filename, such as `"cold-wallet-monk.png"`.
2. Set `PINATA_JWT` in `.env` and run `npm run upload`.
3. Run `npm run compile`.
4. Deploy with `npm run deploy:testnet`.
5. Set `NEXT_PUBLIC_CHAINFOLK_TESTNET_CONTRACT_ADDRESS` in the app environment.

Repeat with the mainnet command only after testnet acceptance. Testnet and mainnet have independent contracts and state. Minting is public and gas-only: there is no per-wallet cap and no total-supply cap. Keep `DEPLOYER_PRIVATE_KEY` and `PINATA_JWT` out of source control.
