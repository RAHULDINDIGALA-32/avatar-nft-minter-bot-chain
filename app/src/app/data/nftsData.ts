const NFTS = [
  {
    tokenId: 0,
    name: 'NeonForger',
    description: 'The builder who shapes chains in glowing code.',
    image: 'https://gateway.pinata.cloud/ipfs/QmX8urjg9jpBnQGSk9rvb8XfLQPE8fQDDG5nf89PNjWjH9',
    tokenURI: 'ipfs://Qmd5N7xeUtesUAf1XwPagG49wo58TxNaj28aEZS2YbqTF6',
    attributes: [
    { trait_type: "Role", value: "Builder" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Glowing" },
    { trait_type: "Headgear", value: "None" },
    { trait_type: "Rarity", value: "Common" }
  ]
  },
   {
    tokenId: 1,
    name: 'Genesis Prime',
    description: 'The first spark of the cyberpunk Web3 era.',
    image: 'https://gateway.pinata.cloud/ipfs/QmUsKmKZw6H7sVuPoDNTWAN8X9oioqYhJAqmQ5gFTubVYG',
    tokenURI: 'ipfs://QmdZ6a4NB6rQ6abEfrpDvVBTHuB98bJJjkPhN5PRrfmzf1',
    attributes: [
    { trait_type: "Role", value: "Genesis" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Glowing" },
    { trait_type: "Headgear", value: "Helmet" },
    { trait_type: "Rarity", value: "Legendary" }
  ]
  },
  {
    tokenId: 2,
    name: 'Blockwarden',
    description: 'Guardian of consensus and finality.',
    image: 'https://gateway.pinata.cloud/ipfs/QmRh3ftNR2uzPoBiRacA16CytVre4cvjzu1oYKw8K9Zkt9',
    tokenURI: 'ipfs://QmSHR8zCHJr7MvhjktKvg2Wxam5Wx7NBAz3H4vM17CRMCR',
    attributes: [
    { trait_type: "Role", value: "Validator" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Neon" },
    { trait_type: "Headgear", value: "Helmet" },
    { trait_type: "Rarity", value: "Rare" }
  ]
  },
  {
    tokenId: 3,
    name: 'PulseTrader',
    description: 'Riding volatility at the speed of light.',
    image: 'https://gateway.pinata.cloud/ipfs/QmbRnvgxpV8bSAPXZxXCdDeHyKnBp1E65E8u7D3eDwngnX',
    tokenURI: 'ipfs://QmWdygKrWRRk34CGiH781ZJHQqx9wA6Tq9NarSMLuL9vwn',
    attributes: [
    { trait_type: "Role", value: "Trader" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Neon" },
    { trait_type: "Headgear", value: "Visor" },
    { trait_type: "Rarity", value: "Common" }
  ]
  },
  {
    tokenId: 4,
    name: 'Oracle Veil',
    description: 'Whisperer of on-chain truths beyond human sight.',
    image: 'https://gateway.pinata.cloud/ipfs/QmWbp2hMrQadQsXicmTf8eKGt957ZuuVyCSNNjC3oZRduv',
    tokenURI: 'ipfs://QmVF7aVWnBwVCYWPAbM1ngcsg59jpoHxsbmr3QnUJVg9SG',
    attributes: [
    { trait_type: "Role", value: "Oracle" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Glowing" },
    { trait_type: "Headgear", value: "Hood" },
    { trait_type: "Rarity", value: "Rare" }
  ]
  },
  {
    tokenId: 5,
    name: 'HexSmith',
    description: 'Engineer of immutable smart contracts.',
    image: 'https://gateway.pinata.cloud/ipfs/QmUQdYUiDdLqiSQyqMFkK1diCtuz5u5CgucohR12NSgWVd',
    tokenURI: 'ipfs://QmdLTbVTBz9ggan8GcTAFcE8554U4DNHhKcRkibN9x3d25',
    attributes: [
    { trait_type: "Role", value: "Engineer" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Glowing" },
    { trait_type: "Headgear", value: "None" },
    { trait_type: "Rarity", value: "Common" }
  ]
  },
  {
    tokenId: 6,
    name: 'DAOmnarch',
    description: 'Strategist ruling decentralized governance.',
    image: 'https://gateway.pinata.cloud/ipfs/QmTV8GcS9LB82JWBJsE1uYJN1we6cjVTTEr9PGwew177mD',
    tokenURI: 'ipfs://QmP6vDAJczBQfXH4VmFCo174fy4QMvmw9khZUSzMxQaFWL',
    attributes: [
    { trait_type: "Role", value: "DAO Strategist" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Neon" },
    { trait_type: "Headgear", value: "None" },
    { trait_type: "Rarity", value: "Rare" }
  ]
  },
  {
    tokenId: 7,
    name: 'CipherSentinel',
    description: 'Auditor standing between exploits and order.',
    image: 'https://gateway.pinata.cloud/ipfs/QmZNcFSHN1yX7MJKujhCLqmK7PJiQ4LEcztxFGETVNacaj',
    tokenURI: 'ipfs://QmezfYP1ExPmmUFaALosq3MY7x5pN5Pesg23BGwDBGJqah',
    attributes: [
    { trait_type: "Role", value: "Auditor" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Normal" },
    { trait_type: "Headgear", value: "Visor" },
    { trait_type: "Rarity", value: "Common" }
  ]
  },
  {
    tokenId: 8,
    name: 'GasRift',
    description: 'Bender of computation and transaction efficiency.',
    image: 'https://gateway.pinata.cloud/ipfs/QmWdrttZsEuu2SCb7ox864dgG3Fd3oeNYuUV7HTPNAPY29',
    tokenURI: 'ipfs://QmPT2Lrn9SuAZaPGsV1QxgDKAUWZxC1KE6oKHncz1MbMVg',
    attributes: [
    { trait_type: "Role", value: "Gas Optimizer" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Glowing" },
    { trait_type: "Headgear", value: "Helmet" },
    { trait_type: "Rarity", value: "Rare" }
  ]
  },
  {
    tokenId: 9,
    name: 'DeFi Nexus',
    description: 'Architect of permissionless financial systems.',
    image: 'https://gateway.pinata.cloud/ipfs/QmP1nfVw2Qc7rVd1dTjS6mGKF5PZBLvLRmHgjvRGUgzpzL',
    tokenURI: 'ipfs://QmYf6qutekmqXSrG5ZLBhzcR9Ggp8owqNcCqrHFi755ogH',
    
    attributes: [
    { trait_type: "Role", value: "DeFi Architect" },
    { trait_type: "Network", value: "Ethereum" },
    { trait_type: "Eyes", value: "Neon" },
    { trait_type: "Headgear", value: "None" },
    { trait_type: "Rarity", value: "Rare" }
  ]
  },
 
];


export default NFTS;