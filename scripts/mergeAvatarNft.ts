const fs = require("fs");

// Input files
const abiPath = "../artifacts/contracts_AvatarNft_sol_AvatarNft.abi";
const binPath = "../artifacts/contracts_AvatarNft_sol_AvatarNft.bin";

// Read contents
const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
let bytecode = fs.readFileSync(binPath, "utf8").trim();

// Ensure "0x" prefix
if (!bytecode.startsWith("0x")) {
  bytecode = "0x" + bytecode;
}

// Output JSON object
const output = {
  abi,
  bytecode
};

// Save to artifacts/Smile.json
fs.writeFileSync("../artifacts/AvatarNft.json", JSON.stringify(output, null, 2));

console.log("✔ Smile.json created successfully!");