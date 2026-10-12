export function ipfsToHttp(uri: string): string {
  return uri.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${uri.slice(7)}` : uri;
}
