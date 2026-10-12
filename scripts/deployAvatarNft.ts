import { privateKeyToAccount } from "viem/accounts";
import {
    createWalletClient,
    http,
    Hex,
    publicActions,
    getContract
} from "viem";
import { sepolia } from "viem/chains";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import avatarNftJson from "../artifacts/AvatarNft.json";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY as Hex;
const account = privateKeyToAccount(privateKey);

const { abi: avatarNftAbi, bytecode: avatarNftBytecode } = avatarNftJson;

// Ensure deployment directory exists
const DEPLOYMENT_DIR = path.resolve(process.cwd(), "deployments");
if (!fs.existsSync(DEPLOYMENT_DIR)) {
    fs.mkdirSync(DEPLOYMENT_DIR, { recursive: true });
}

async function deployNftContract() {
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC_URL)
    }).extend(publicActions);

    const txnHash = await client.deployContract({
        abi: avatarNftAbi,
        bytecode: avatarNftBytecode as Hex,
        args: [account.address]
    });

    console.log("Deployment transaction hash:", txnHash);

    const txnReceipt = await client.waitForTransactionReceipt({
        hash: txnHash
    });

    if (!txnReceipt.contractAddress) {
        console.error("Contract deployment failed.");
        process.exit(1);
    }

    console.log(
        "Contract deployed at address:",
        txnReceipt.contractAddress
    );

    // Save deployment metadata for frontend usage
    const deploymentData = {
        contractName: "AvatarNft",
        address: txnReceipt.contractAddress,
        chain: sepolia.name,
        chainId: sepolia.id,
        abi: avatarNftAbi,
        deployedAt: new Date().toISOString()
    };

    const filePath = path.join(
        DEPLOYMENT_DIR,
        `AvatarNft.${sepolia.name}.json`
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(deploymentData, null, 2),
        "utf-8"
    );

    console.log("Deployment metadata written to:", filePath);

    const avatarNftContract = getContract({
        address: txnReceipt.contractAddress,
        abi: avatarNftAbi,
        client
    });

    return avatarNftContract;
}

const contract = deployNftContract()
    .then((contract) => {
        console.log(
            "AvatarNft contract deployed successfully:",
            contract.address
        );
    })
    .catch((error) => {
        console.error("Error deploying AvatarNft contract:", error);
    });

export default contract;
