import fs from 'node:fs/promises';

const artifact = JSON.parse(await fs.readFile('artifacts/contracts/ChainfolkAvatarNft.sol/ChainfolkAvatarNft.json', 'utf8'));

await fs.writeFile('artifacts/ChainfolkAvatarNft.json', JSON.stringify({ abi: artifact.abi, bytecode: artifact.bytecode }, null, 2));

console.log('Exported artifacts/ChainfolkAvatarNft.json');
