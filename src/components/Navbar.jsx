import { NavLink } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export default function Navbar({ wallet, onConnect, loading }) {
  return (
    <nav className="bg-[#050c05] border-b border-[#1a2e1a] px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <NavLink to="/" className="font-mono font-bold text-lg text-[#e0ffe0] tracking-tight shrink-0">
        H2 Music Label
      </NavLink>

      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-[#39e07a]' : 'text-[#8aaa8a] hover:text-[#e0ffe0]'}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-[#39e07a]' : 'text-[#8aaa8a] hover:text-[#e0ffe0]'}`
          }
        >
          Daftar Lagu
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-[#39e07a]' : 'text-[#8aaa8a] hover:text-[#e0ffe0]'}`
          }
        >
          Upload Lagu
        </NavLink>
        <NavLink
          to="/wallet"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-[#39e07a] border-b border-[#39e07a] pb-0.5' : 'text-[#8aaa8a] hover:text-[#e0ffe0]'}`
          }
        >
          Wallet
        </NavLink>
      </div>

      <button
        onClick={onConnect}
        disabled={loading}
        className={`flex items-center gap-2 text-sm font-mono font-semibold px-4 py-2 rounded-lg border transition-all duration-150 ${
          wallet.connected
            ? 'border-[#39e07a] text-[#39e07a] bg-[#39e07a15]'
            : 'border-[#39e07a] text-[#39e07a] hover:bg-[#39e07a15]'
        }`}
      >
        <Wallet size={14} />
        {loading ? 'Connecting...' : wallet.connected ? wallet.address ?? 'Connected' : 'Connect Wallet'}
      </button>
    </nav>
  );
}
