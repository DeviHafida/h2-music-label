import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ticker from './components/Ticker';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import SongDetail from './pages/SongDetail';
import UploadSong from './pages/UploadSong';
import WalletPage from './pages/WalletPage';
import { useWallet } from './hooks/useWallet';

function App() {
  const { wallet, loading, connect } = useWallet();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050c05] text-[#e0ffe0] flex flex-col">
        <Ticker />
        <Navbar wallet={wallet} onConnect={connect} loading={loading} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/upload" element={<UploadSong />} />
            <Route path="/wallet" element={<WalletPage wallet={wallet} onConnect={connect} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
