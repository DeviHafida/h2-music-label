import { ethers } from 'ethers';

// 1. ABI DISESUAIKAN PERSIS DENGAN FUNGSI DI MUSICROYALTY.SOL KAMU
export const ROYALTY_CONTRACT_ABI = [
  // Fungsi Write
  'function registerSong(string memory _title, string memory _artist, string memory _genre, address[] memory _collaborators, uint[] memory _shares) external',
  'function playSong(uint _songId) external payable',
  'function claimRoyalty(uint _songId) external',
  
  // Fungsi Read
  'function getSongDetails(uint _songId) external view returns (string memory title, string memory artist, string memory genre, uint totalPlays, address[] memory collaborators, uint[] memory shares)',
  'function getAllSongs() external view returns (tuple(uint id, string title, string artist, string genre, address[] collaborators, uint[] shares, uint totalPlays, bool isActive)[])',
  'function getTotalSongs() external view returns (uint)',
  'function pendingRoyalties(uint, address) external view returns (uint)',

  // Events
  'event SongRegistered(uint indexed songId, string title, address indexed owner)',
  'event SongPlayed(uint indexed songId, address indexed listener, uint amount)',
  'event RoyaltyClaimed(uint indexed songId, address indexed collaborator, uint amount)'
];

// 2. GANTI INI DENGAN ALAMAT KONTRAK HASIL DEPLOY KAMU (Contoh: '0x5FbDB2315678afecb367f032d93F642f64180aa3')
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

// Mengambil object contract siap pakai
export async function getContract(signerOrProvider) {
  return new ethers.Contract(ROYALTY_CONTRACT_ADDRESS, ROYALTY_CONTRACT_ABI, signerOrProvider);
}

// --- FUNGSI PENDUKUNG TRANSAKSI (Bisa dipakai di halaman Catalog / Upload nanti) ---

// Fungsi untuk mengklaim Royalti berdasarkan ID Lagu
export async function claimRoyalty(signer, songId) {
  const contract = await getContract(signer);
  return contract.claimRoyalty(songId);
}

// Fungsi untuk melihat saldo royalti yang belum ditarik oleh musisi di suatu lagu
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