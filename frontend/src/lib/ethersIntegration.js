import { ethers } from 'ethers';

export const ROYALTY_CONTRACT_ABI = [
  'function registerSong(string _title, string _artist, string _genre, address[] _collaborators, uint256[] _shares)',
  'function playSong(uint256 _songId) payable',
  'function claimRoyalty(uint256 _songId)',
  
  'function getSongDetails(uint256 _songId) view returns (string title, string artist, string genre, uint256 totalPlays, address[] collaborators, uint256[] shares)',
  'function getAllSongs() view returns ((uint256 id, string title, string artist, string genre, address[] collaborators, uint256[] shares, uint256 totalPlays, bool isActive)[])',
  'function getTotalSongs() view returns (uint256)',
  'function songCounter() view returns (uint256)', 
  'function pendingRoyalties(uint256, address) view returns (uint256)',

  'event SongRegistered(uint256 indexed songId, string title, address indexed owner)',
  'event SongPlayed(uint256 indexed songId, address indexed listener, uint256 amount)',
  'event RoyaltyClaimed(uint256 indexed songId, address indexed collaborator, uint256 amount)'
];

export const ROYALTY_CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

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

export async function claimRoyalty(signer, songId) {
  const contract = await getContract(signer);
  return contract.claimRoyalty(songId);
}

export async function getRoyaltyBalance(provider, songId, artistAddress) {
  const contract = await getContract(provider);
  const balance = await contract.pendingRoyalties(songId, artistAddress);
  return ethers.formatEther(balance);
}

export function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTxHash(hash) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}