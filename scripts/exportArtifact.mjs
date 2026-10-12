import fs from 'node:fs/promises';

const artifact = JSON.parse(await fs.readFile('artifacts/contracts/AvatarNft.sol/AvatarNft.json', 'utf8'));

await fs.writeFile('artifacts/AvatarNft.json', JSON.stringify({ abi: artifact.abi, bytecode: artifact.bytecode }, null, 2));

console.log('Exported artifacts/AvatarNft.json');
