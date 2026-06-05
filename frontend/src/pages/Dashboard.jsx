import { useNavigate } from 'react-router-dom';
import { Music2, Coins, Play, Users, ArrowRight, MonitorSpeaker, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from '../components/Footer';
import { recentSongs, royaltyChartData } from '../data/mockData';

const stats = [
  { label: 'TOTAL LAGU', value: '1,284', change: '+12%', icon: Music2 },
  { label: 'TOTAL PLAYS', value: '12.4M', change: '+21%', icon: Play },
  { label: 'TOTAL KOLABORATOR', value: '342', badge: 'Active', icon: Users },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#0d160d] border border-[#1a2e1a] rounded-lg px-3 py-2 text-xs">
        <div className="text-[#4d7a4d] font-mono">{label}</div>
        <div className="text-[#39e07a] font-mono font-semibold">{payload[0].value} ETH</div>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Hero Banner */}
        <div
          className="relative overflow-hidden mx-4 mt-4 rounded-2xl border border-[#1a2e1a]"
          style={{ minHeight: 260 }}
        >
          <img
            src="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050c05] via-[#050c05cc] to-transparent" />
          <div className="relative z-10 p-10 max-w-lg">
            <span className="tag text-[10px] mb-4 inline-block">WEB3 POWERED DISTRIBUTION</span>
            <h1 className="text-4xl font-bold text-[#e0ffe0] leading-tight mt-3">
              Music Royalty<br />Management
            </h1>
            <p className="text-sm text-[#8aaa8a] mt-3 leading-relaxed max-w-sm">
              Transparent blockchain-based royalty distribution for the next generation of independent artists. Track, claim, and manage your earnings in real-time.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <MonitorSpeaker size={160} className="text-[#39e07a]" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3 px-4 mt-4">
          {stats.map(({ label, value, unit, change, badge, icon: Icon }) => (
            <div key={label} className="card p-4 relative overflow-hidden group hover:border-[#39e07a33] transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <Icon size={18} className="text-[#39e07a]" />
                {change && (
                  <span className="text-[10px] font-mono text-[#39e07a] bg-[#39e07a15] px-1.5 py-0.5 rounded">
                    {change}
                  </span>
                )}
                {badge && (
                  <span className="text-[10px] font-mono text-[#39e07a] bg-[#39e07a15] px-1.5 py-0.5 rounded">
                    {badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-[#4d7a4d] font-mono uppercase tracking-wider mb-1">{label}</div>
              <div className="text-2xl font-bold text-[#e0ffe0]">
                {value}
                {unit && <span className="text-sm font-mono text-[#39e07a] ml-1">{unit}</span>}
              </div>
              <div className="absolute bottom-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Icon size={80} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Tracks */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#e0ffe0]">Daftar Lagu Terbaru</h2>
            <button
              onClick={() => navigate('/catalog')}
              className="flex items-center gap-1 text-sm text-[#39e07a] hover:brightness-110 transition-all"
            >
              See All Tracks <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {recentSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => navigate(`/song/${song.id}`)}
                className="card cursor-pointer hover:border-[#39e07a33] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111d11] to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#e0ffe0] text-sm">{song.title}</span>
                    <span className="tag text-[9px]">{song.genre}</span>
                  </div>
                  <div className="text-xs text-[#4d7a4d] mb-3">{song.artist}</div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-[#4d7a4d]">Mint Progress</span>
                      <span className="text-[#39e07a]">{song.mintProgress}%</span>
                    </div>
                    <div className="h-1 bg-[#1a2e1a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#39e07a] rounded-full transition-all duration-500"
                        style={{ width: `${song.mintProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
