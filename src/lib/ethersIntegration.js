import { ethers } from 'ethers';

export const ROYALTY_CONTRACT_ABI = [
  'function claimRoyalty() external',
  'function getRoyaltyBalance(address artist) view returns (uint256)',
  'function getTrackInfo(uint256 trackId) view returns (string title, address[] collaborators, uint256[] shares)',
  'event RoyaltyClaimed(address indexed artist, uint256 amount)',
  'event TrackRegistered(uint256 indexed trackId, address indexed owner, string title)',
];

export const ROYALTY_CONTRACT_ADDRESS = '0x4eDe000000000000000000000000000A3B9c0C1f';

export async function connectWallet() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask or compatible wallet not detected');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);
  const network = await provider.getNetwork();

  return {
    address,
    balance: ethers.formatEther(balance),
    chainId: Number(network.chainId),
    connected: true,
  };
}

export async function disconnectWallet() {
  return { address: null, balance: null, chainId: null, connected: false };
}

export async function getContract(signerOrProvider) {
  return new ethers.Contract(ROYALTY_CONTRACT_ADDRESS, ROYALTY_CONTRACT_ABI, signerOrProvider);
}

export async function claimRoyalty(signer) {
  const contract = await getContract(signer);
  return contract.claimRoyalty();
}

export async function getRoyaltyBalance(provider, artistAddress) {
  const contract = await getContract(provider);
  const balance = await contract.getRoyaltyBalance(artistAddress);
  return ethers.formatEther(balance);
}

export function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTxHash(hash) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}
