import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Library, ShoppingBag, Settings, Upload, HelpCircle, LogOut } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/analytics', label: 'Analytics', icon: BarChart2, end: false },
  { to: '/catalog', label: 'Library', icon: Library, end: false },
  { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag, end: false },
  { to: '/settings', label: 'Settings', icon: Settings, end: false },
];

export default function Sidebar({ onUpload }) {
  return (
    <aside className="w-44 bg-[#050c05] border-r border-[#1a2e1a] flex flex-col min-h-screen py-6 shrink-0">
      <div className="px-4 mb-8">
        <div className="text-sm font-bold text-[#39e07a]">H2 Music</div>
        <div className="text-xs text-[#4d7a4d] mt-0.5">Creator Studio</div>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#39e07a15] text-[#39e07a] border-r-2 border-[#39e07a]'
                  : 'text-[#8aaa8a] hover:text-[#e0ffe0] hover:bg-[#0d160d]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 mt-6 space-y-1">
        <button
          onClick={onUpload}
          className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#39e07a] text-[#050c05] rounded-lg text-sm font-semibold hover:brightness-110 transition-all duration-150"
        >
          <Upload size={14} />
          Upload Track
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8aaa8a] hover:text-[#e0ffe0] hover:bg-[#0d160d] transition-all duration-150">
          <HelpCircle size={16} />
          Help
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8aaa8a] hover:text-[#e0ffe0] hover:bg-[#0d160d] transition-all duration-150">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
