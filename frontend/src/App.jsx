import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // DATA SEMENTARA (mock data) - Nanti diganti dengan data dari smart contract
  const [songs, setSongs] = useState([
    { id: 1, title: "Cinta Pertama", artist: "Andi", genre: "Pop", plays: 128, totalRoyalty: 0.85 },
    { id: 2, title: "Senja Lagi", artist: "Budi", genre: "Rock", plays: 95, totalRoyalty: 0.62 },
    { id: 3, title: "Hujan Bulan Juni", artist: "Citra", genre: "Jazz", plays: 203, totalRoyalty: 1.45 },
    { id: 4, title: "Terus Berlari", artist: "Dewi", genre: "Pop", plays: 67, totalRoyalty: 0.43 },
  ]);

  // Connect ke MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      setIsConnecting(true);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Gagal connect wallet:", error);
        alert("Gagal connect MetaMask. Silakan coba lagi.");
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("MetaMask belum terinstall. Silakan install terlebih dahulu.");
      window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
  };

  // Handle play & pay
  const handlePlayAndPay = (songId, songTitle, royaltyAmount) => {
    if (!account) {
      alert("Silakan connect wallet terlebih dahulu untuk memutar lagu.");
      return;
    }
    alert(`Memutar: ${songTitle}\nRoyalti: ${royaltyAmount} ETH akan dibayarkan.`);
    // Nanti diintegrasikan dengan smart contract
  };

  // Handle detail
  const handleDetail = (songId, songTitle) => {
    alert(`Detail lagu: ${songTitle}\nID: ${songId}`);
    // Nanti bisa buka modal atau halaman detail
  };

  // Format alamat wallet (0x1234...5678)
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="App">
      {/* Navbar / Header */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">♪</span>
          <span className="logo-text">MusicRoyalty</span>
        </div>
        
        <div className="wallet-section">
          {!account ? (
            <button 
              className="btn-connect" 
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <div className="wallet-info">
              <span className="wallet-address">{formatAddress(account)}</span>
              <button className="btn-disconnect" onClick={disconnectWallet}>Disconnect</button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Music Royalty Management</h1>
        <p>Transparent, Automated, and Decentralized Music Royalty System on Blockchain</p>
        {!account && (
          <button className="btn-hero" onClick={connectWallet}>
            Get Started
          </button>
        )}
      </section>

      {/* Daftar Lagu */}
      <div className="content-area">
        <div className="section-header">
          <h2>Registered Songs</h2>
          <span className="song-count">{songs.length} Songs</span>
        </div>

        <div className="song-grid">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-header">
                <span className="song-id">#{song.id}</span>
                <span className="song-genre">{song.genre}</span>
              </div>
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
              
              <div className="song-stats">
                <div className="stat">
                  <span className="stat-label">Plays</span>
                  <span className="stat-value">{song.plays}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Royalty</span>
                  <span className="stat-value">{song.totalRoyalty} ETH</span>
                </div>
              </div>

              <div className="song-actions">
                <button 
                  className="btn-play" 
                  disabled={!account}
                  onClick={() => handlePlayAndPay(song.id, song.title, song.totalRoyalty)}
                >
                  Play & Pay
                </button>
                <button 
                  className="btn-detail"
                  onClick={() => handleDetail(song.id, song.title)}
                >
                  Details
                </button>
              </div>
              
              {!account && (
                <p className="login-warning">Connect wallet first to play songs</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-copyright">© 2025 Music Royalty System</p>
        <p className="footer-note">Smart Contract Based Music Royalty Management System</p>
      </footer>
    </div>
  );
}

export default App;