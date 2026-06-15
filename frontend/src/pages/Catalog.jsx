import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { ROYALTY_CONTRACT_ADDRESS, ROYALTY_CONTRACT_ABI } from '../lib/ethersIntegration';
import { Music, Play, Disc } from 'lucide-react'; 

export default function Catalog() {
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongsFromBlockchain = async () => {
      if (!window.ethereum) {
        alert("Silakan hubungkan MetaMask terlebih dahulu!");
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(ROYALTY_CONTRACT_ADDRESS, ROYALTY_CONTRACT_ABI, provider);
        
        const allSongs = await contract.getAllSongs();
        
        const formattedSongs = allSongs.map((song) => ({
          id: song.id.toString(),
          title: song.title,
          artist: song.artist,
          genre: song.genre,
          plays: song.totalPlays.toString(),
          isActive: song.isActive,
          coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300"
        }));

        setSongsList(formattedSongs);
      } catch (error) {
        console.error("Gagal mengambil daftar lagu dari Hardhat:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSongsFromBlockchain();
  }, []);

  if (loading) {
    return <div className="text-center py-20 font-mono text-[#39e07a]">Sinkronisasi Jaringan Blockchain Hardhat...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#e0ffe0] mb-2">Music Catalog</h1>
      <p className="text-[#4d7a4d] mb-8 font-mono">Daftar kekayaan intelektual yang terdaftar on-chain secara transparan.</p>

      {songsList.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-[#1a2e1a] rounded-xl text-[#8aaa8a]">
          Belum ada lagu yang terdaftar di Blockchain. Silakan menuju halaman Upload Song!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {songsList.map((song) => (
            <div key={song.id} className="bg-[#0d160d] border border-[#1a2e1a] rounded-xl p-4 hover:border-[#39e07a] transition-all group">
              <div className="relative rounded-lg overflow-hidden mb-4 aspect-square">
                <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {/* Link menuju halaman detail lagu berdasarkan ID asli Blockchain */}
                  <Link to={`/song/${song.id}`} className="p-3 bg-[#39e07a] rounded-full text-black hover:scale-105 transition-transform">
                    <Play size={20} fill="black" />
                  </Link>
                </div>
              </div>
              <h3 className="font-bold text-[#e0ffe0] truncate">{song.title}</h3>
              <p className="text-sm text-[#8aaa8a] mb-3">{song.artist}</p>
              <div className="flex items-center justify-between text-xs font-mono text-[#4d7a4d] border-t border-[#1a2e1a] pt-3">
                <span>GENRE: {song.genre}</span>
                <span className="text-[#39e07a]">PLAYS: {song.plays}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}