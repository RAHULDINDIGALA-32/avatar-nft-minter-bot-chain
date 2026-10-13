'use client';

import { useEffect, useMemo } from 'react';
import {
  useAccount, useChainId, useConfig, useSwitchChain,
  useWaitForTransactionReceipt, useWriteContract, type BaseError,
} from 'wagmi';
import { parseEventLogs, UserRejectedRequestError } from 'viem';
import { toast } from 'react-hot-toast';
import { chainfolkAvatarNftAbi, deployments } from '../config/chainfolkAvatarNft';
import type { NFT } from '../types';

const transferAbi = [{
  type: 'event', name: 'Transfer',
  inputs: [
    { name: 'from', type: 'address', indexed: true },
    { name: 'to', type: 'address', indexed: true },
    { name: 'tokenId', type: 'uint256', indexed: true },
  ],
}] as const;

export type MintStatus = 'idle' | 'wallet' | 'confirming' | 'success' | 'error';
export type MintApi = ReturnType<typeof useMint>;

export function useMint() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { chains } = useConfig();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const deployment = deployments[chainId];
  const targetChain = chains.find((c) => deployments[c.id]?.address);
  const targetDeployment = targetChain ? deployments[targetChain.id] : undefined;
  const wrongNetwork = isConnected && !deployment?.address;

  const { data: hash, writeContract, isPending, error: writeError, reset } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const rejected = Boolean(
    writeError && (writeError as BaseError).walk?.((e) => e instanceof UserRejectedRequestError),
  );
  const reverted = receipt.data?.status === 'reverted';

  let status: MintStatus = 'idle';
  if (isPending) status = 'wallet';
  else if (writeError && !rejected) status = 'error';
  else if (hash) {
    if (reverted || receipt.isError) status = 'error';
    else if (receipt.isSuccess) status = 'success';
    else status = 'confirming';
  }

  const errorMessage =
    status !== 'error' ? null
      : reverted ? 'The transaction reverted on-chain. No NFT was minted.'
      : (writeError as BaseError | null)?.shortMessage ?? 'The transaction failed. Try again.';

  const tokenId = useMemo(() => {
    if (!receipt.data || !address) return null;
    const logs = parseEventLogs({ abi: transferAbi, logs: receipt.data.logs, eventName: 'Transfer' });
    return logs.find((l) => l.args.to?.toLowerCase() === address.toLowerCase())?.args.tokenId ?? null;
  }, [receipt.data, address]);

  useEffect(() => {
    if (status === 'confirming') toast.loading('Minting. Waiting for confirmation…', { id: 'mint' });
    else if (status === 'success') toast.success('Minted. Check your wallet.', { id: 'mint' });
    else if (status === 'error') toast.error(errorMessage ?? 'Mint failed', { id: 'mint' });
    else if (rejected) toast('Cancelled in your wallet.', { id: 'mint' });
  }, [status, errorMessage, rejected]);

  function mint(nft: NFT) {
    if (!deployment?.address) return;
    writeContract({ address: deployment.address, abi: chainfolkAvatarNftAbi, functionName: 'mint', args: [nft.tokenURI] });
  }

  return {
    status, hash, tokenId, errorMessage, mint, reset,
    isBusy: status === 'wallet' || status === 'confirming',
    isConnected, wrongNetwork, deployment, targetChain, targetDeployment,
    switchNetwork: (id: number) => switchChain({ chainId: id }), isSwitching,
  };
}
