import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const PINATA_FILE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

const IMAGES_DIR = "./nfts/images";
const METADATA_DIR = "./nfts/metadata";

const headers = {
  pinata_api_key: process.env.PINATA_API_KEY,
  pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
};

// Upload image to Pinata
async function uploadImage(filePath) {
  const data = new FormData();
  data.append("file", fs.createReadStream(filePath));

  const res = await axios.post(PINATA_FILE_URL, data, {
    maxBodyLength: Infinity,
    headers: {
      ...data.getHeaders(),
      ...headers
    }
  });

  return res.data.IpfsHash;
}

// Upload metadata JSON
async function uploadMetadata(json) {
  const res = await axios.post(PINATA_JSON_URL, json, {
    headers
  });

  return res.data.IpfsHash;
}

async function main() {
  console.log("====== Uploading NFT Images =======\n");

  const imageFiles = fs.readdirSync(IMAGES_DIR);
  const imageCIDs = {};

  // 1. Upload Images
  for (const file of imageFiles) {
    const filePath = path.join(IMAGES_DIR, file);
    const cid = await uploadImage(filePath);
    imageCIDs[file] = cid;

    console.log(`${file} → ipfs://${cid}`);
  }

  console.log("\n====== Uploading Metadata =======\n");

  const metadataFiles = fs.readdirSync(METADATA_DIR);
  const tokenURIs = [];

  // 2️. Upload Metadata
  for (const file of metadataFiles) {
    const filePath = path.join(METADATA_DIR, file);
    let metadata = JSON.parse(fs.readFileSync(filePath));

    const imageFileName = file.replace(".json", ".png");
    const imageCID = imageCIDs[imageFileName];

    if (!imageCID) {
      throw new Error(`Image not found for ${file}`);
    }

    metadata.image = `ipfs://${imageCID}`;

    const metadataCID = await uploadMetadata(metadata);
    const tokenURI = `ipfs://${metadataCID}`;
    tokenURIs.push(tokenURI);

    console.log(`${file} → ${tokenURI}`);
  }

  console.log("\nALL NFTS UPLOADED SUCCESSFULLY!");
  console.log("\nFINAL TOKEN URIs:");
  tokenURIs.forEach((uri, i) => {
    console.log(`Token ${i + 1}: ${uri}`);
  });
}

main().catch(console.error);
