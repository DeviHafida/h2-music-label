import { useState, useEffect } from 'react';
import { BarChart2, Music, Wallet, Copy, Filter, Download, Clock, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import { transactions } from '../data/mockData';
import { claimRoyalty, getRoyaltyBalance } from '../lib/ethersIntegration';
import { ethers } from 'ethers';

export default function WalletPage({ wallet, onConnect }) {
  const [copiedHash, setCopiedHash] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  
  // State baru untuk menampung data Unclaimed Royalty dari Smart Contract
  const [unclaimedRoyalty, setUnclaimedRoyalty] = useState('0.00');

  // Ambil data saldo royalti dari Smart Contract secara real-time saat wallet terhubung
  useEffect(() => {
    const fetchRoyalty = async () => {
      if (wallet.connected && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          // Kita uji coba mengambil sisa royalti untuk ID Lagu #1 (sesuaikan skenario pengujian kalian)
          const targetSongId = 1; 
          
          // Memanggil fungsi pendingRoyalties dari contract via utilitas kita
          const contractBalance = await getRoyaltyBalance(provider, targetSongId, window.ethereum.selectedAddress);
          setUnclaimedRoyalty(contractBalance);
        } catch (err) {
          console.error("Gagal mengambil saldo royalti dari contract:", err);
        }
      }
    };
    fetchRoyalty();
  }, [wallet.connected]);

  const handleCopy = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  // MENGUBAH SIMULASI TIMEOUT MENJADI TRANSAKSI METAMASK NYATA
  const handleClaim = async () => {
    if (!window.ethereum) return;
    
    setClaiming(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Eksekusi fungsi claimRoyalty asli ke Smart Contract Hardhat
      const targetSongId = 1; // Contoh id lagu yang diklaim
      const tx = await claimRoyalty(signer, targetSongId);
      
      console.log("Transaksi dikirim, menunggu konfirmasi blockchain...", tx.hash);
      await tx.wait(); // Menunggu blok dikonfirmasi oleh Hardhat Node
      
      setClaimed(true);
      setUnclaimedRoyalty('0.00'); // Reset balance tampilan setelah sukses ditarik
      setTimeout(() => setClaimed(false), 3000);
    } catch (error) {
      console.error("Transaksi klaim gagal/dibatalkan musisi:", error);
    } finally {
      setLoading(false);
      setClaiming(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 pt-8 pb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#e0ffe0]">Wallet & Royalties</h1>
            <p className="text-sm text-[#8aaa8a] mt-1">Manage your earnings and blockchain assets in real-time.</p>
          </div>
          <div className="card px-6 py-4 flex items-center gap-4 border-[#39e07a22]">
            <div className="w-10 h-10 rounded-xl bg-[#39e07a15] flex items-center justify-center border border-[#39e07a33]">
              <Wallet size={18} className="text-[#39e07a]" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider">TOTAL ETH BALANCE</div>
              <div className="text-2xl font-bold text-[#e0ffe0] mt-0.5">
                {/* MENGGUNAKAN VALUE ASLI METAMASK TANPA FALLBACK HARDCODED */}
                {wallet.connected ? (wallet.balance || '0.00') : '—'} ETH
              </div>
            </div>
          </div>
        </div>

        {/* Main Cards Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Unclaimed Revenue Card */}
          <div className="col-span-2 card p-6 border-[#39e07a22]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full border border-[#39e07a] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#39e07a]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-widest">UNCLAIMED REVENUE</span>
                </div>
                {/* MENAMPILKAN DATA ASLI PENDING ROYALTIES DARI SMART CONTRACT */}
                <div className="text-5xl font-bold text-[#39e07a]">{wallet.connected ? `${unclaimedRoyalty} ETH` : '— ETH'}</div>
                <div className="text-sm text-[#4d7a4d] mt-1">≈ ${(parseFloat(unclaimedRoyalty) * 2450).toFixed(2)} USD</div>
              </div>
              <button
                onClick={wallet.connected ? handleClaim : onConnect}
                disabled={claiming}
                className="btn-primary text-sm px-6 py-3 self-center"
              >
                <Wallet size={14} />
                {claiming ? 'Claiming...' : claimed ? 'Claimed!' : wallet.connected ? 'Claim Royalty' : 'Connect Wallet'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[#1a2e1a]">
              {[
                { label: 'LAST SETTLEMENT', value: 'Real-time On-Chain' },
                { label: 'STREAMS CALCULATED', value: 'Synced with Hardhat Node' },
                { label: 'ROYALTY SPLIT', value: 'Smart Contract Verified' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[9px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-sm text-[#e0ffe0] font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Column */}
          <div className="space-y-3">
            <div className="card p-5">
              <div className="flex items-start justify-between mb-2">
                <BarChart2 size={18} className="text-[#39e07a]" />
                <span className="text-xs font-mono text-[#39e07a] bg-[#39e07a15] px-2 py-0.5 rounded">Live Ledger</span>
              </div>
              <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mt-3 mb-1">TOTAL EARNED</div>
              <div className="text-2xl font-bold text-[#e0ffe0]">{wallet.connected ? `${(42.5).toFixed(2)} ETH` : '—'}</div>
            </div>

            <div className="card p-5">
              <div className="flex items-start justify-between mb-2">
                <Music size={18} className="text-[#39e07a]" />
                <span className="text-sm font-mono text-[#8aaa8a]">Decentralized</span>
              </div>
              <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mt-3 mb-1">ACTIVE CONTRACTS</div>
              <div className="text-2xl font-bold text-[#e0ffe0]">1 Smart Contract</div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#39e07a]" />
              <h2 className="font-semibold text-[#e0ffe0] text-base">Transaction History (Mock Data)</h2>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider border-b border-[#1a2e1a]">
                <th className="pb-3 text-left font-normal">DATE</th>
                <th className="pb-3 text-left font-normal">SONG / ASSET</th>
                <th className="pb-3 text-left font-normal">AMOUNT</th>
                <th className="pb-3 text-left font-normal">TRANSACTION HASH</th>
                <th className="pb-3 text-left font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-[#1a2e1a] last:border-0 hover:bg-[#0d160d] transition-colors">
                  <td className="py-4 text-sm text-[#8aaa8a] font-mono">{tx.date}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={tx.coverUrl} alt={tx.song} className="w-9 h-9 rounded-lg object-cover border border-[#1a2e1a]" />
                      <div>
                        <div className="text-sm font-medium text-[#e0ffe0]">{tx.song}</div>
                        <div className="text-xs text-[#4d7a4d]">{tx.songType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-mono font-semibold text-[#39e07a]">{tx.amount}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-[#8aaa8a]">{tx.txHash}</span>
                      <button
                        onClick={() => handleCopy(tx.txHash)}
                        className="text-[#4d7a4d] hover:text-[#39e07a] transition-colors"
                      >
                        {copiedHash === tx.txHash ? <CheckCircle size={12} className="text-[#39e07a]" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
                      tx.status === 'Success'
                        ? 'bg-[#39e07a15] text-[#39e07a] border-[#39e07a33]'
                        : 'bg-[#f59e0b15] text-[#f59e0b] border-[#f59e0b33]'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}