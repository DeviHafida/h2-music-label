import { useParams, useNavigate } from 'react-router-dom';
import { Play, Copy, CheckCircle, ExternalLink, Filter, Download, Shield } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { songs } from '../data/mockData';

const PIE_COLORS = ['#39e07a', '#8b5cf6', '#4d7a4d'];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#0d160d] border border-[#1a2e1a] rounded-lg px-3 py-2 text-xs">
        <div className="text-[#e0ffe0] font-semibold">{payload[0].name}</div>
        <div className="text-[#39e07a] font-mono">{payload[0].value}%</div>
      </div>
    );
  }
  return null;
};

export default function SongDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const song = songs.find((s) => s.id === id) ?? songs[0];

  const distributionData = [
    { name: 'Singer', value: 50 },
    { name: 'Producer', value: 30 },
    { name: 'Label Pool', value: 20 },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(song.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onUpload={() => navigate('/upload')} />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 px-6 py-6 max-w-5xl mx-auto w-full">
          {/* Top Section */}
          <div className="flex gap-8 mb-6">
            {/* Cover Art */}
            <div className="relative shrink-0 w-64 h-64 rounded-2xl overflow-hidden border border-[#1a2e1a] group">
              <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#050c0580] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button className="w-14 h-14 rounded-full bg-[#39e07a] flex items-center justify-center hover:brightness-110 transition-all">
                  <Play size={22} className="text-[#050c05] ml-1" fill="#050c05" />
                </button>
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono bg-[#39e07a15] border border-[#39e07a33] text-[#39e07a] px-2 py-0.5 rounded">
                  ERC-1155
                </span>
                <span className="text-xs text-[#4d7a4d] font-mono">RELEASED: {song.releaseDate}</span>
              </div>

              <h1 className="text-4xl font-bold text-[#e0ffe0] mb-1">{song.title}</h1>
              <p className="text-[#8aaa8a] mb-5">{song.artist} <span className="text-[#1a2e1a]">■</span> Vol. 04</p>

              <div className="grid grid-cols-4 gap-4 mb-5">
                {[
                  { label: 'MINTS', value: song.mints.toLocaleString(), highlight: true },
                  { label: 'FLOOR PRICE', value: song.floorPrice },
                  { label: 'PLAYS', value: song.plays },
                  { label: 'SHARES', value: song.shares },
                ].map(({ label, value, highlight }) => (
                  <div key={label}>
                    <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-1">{label}</div>
                    <div className={`text-xl font-bold ${highlight ? 'text-[#39e07a]' : 'text-[#e0ffe0]'}`}>{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-[#0d160d] border border-[#1a2e1a] rounded-lg px-4 py-3">
                <div>
                  <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-1">SMART CONTRACT ADDRESS</div>
                  <div className="text-sm font-mono text-[#39e07a]">{song.contractAddress}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleCopy} className="text-[#4d7a4d] hover:text-[#39e07a] transition-colors">
                    {copied ? <CheckCircle size={14} className="text-[#39e07a]" /> : <Copy size={14} />}
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-[#4d7a4d]">
                    <Shield size={12} className="text-[#39e07a]" />
                    <span>Audited by CertiK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Royalty + Distribution */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2 card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-[#e0ffe0] text-lg">Royalty Collection Progress</h2>
                  <p className="text-xs text-[#4d7a4d] mt-0.5">Earnings milestone tracking in real-time</p>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider">TOTAL COLLECTED</div>
                  <div className="text-2xl font-bold text-[#39e07a]">{song.totalCollectedEth} ETH</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="h-10 bg-[#0d160d] rounded-full border border-[#1a2e1a] overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-center transition-all duration-700"
                    style={{
                      width: `${song.milestonePercent}%`,
                      background: 'linear-gradient(90deg, #1a3e2a, #39e07a)',
                    }}
                  >
                    <span className="text-xs font-mono font-semibold text-[#e0ffe0]">
                      {song.milestonePercent}% Milestone Reached
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'STREAMING', value: `${song.streamingEth} ETH` },
                  { label: 'LICENSING', value: `${song.licensingEth} ETH` },
                  { label: 'NFT ROYALTIES', value: `${song.nftRoyaltiesEth} ETH` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#0d160d] border border-[#1a2e1a] rounded-xl p-4">
                    <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-2">{label}</div>
                    <div className="text-xl font-bold text-[#e0ffe0]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="font-semibold text-[#e0ffe0] mb-4">Distribution</h2>
              <div className="relative h-36 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={44}
                      outerRadius={64}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {distributionData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-xs font-bold text-[#e0ffe0]">0.32%</div>
                    <div className="text-[9px] text-[#4d7a4d]">Tax Fee</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {distributionData.map(({ name, value }, i) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-xs text-[#8aaa8a]">{name}</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#e0ffe0]">{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collaborators */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-[#e0ffe0] text-base">Project Collaborators</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg border border-[#1a2e1a] flex items-center justify-center text-[#4d7a4d] hover:border-[#39e07a] hover:text-[#39e07a] transition-colors">
                  <Filter size={13} />
                </button>
                <button className="w-8 h-8 rounded-lg border border-[#1a2e1a] flex items-center justify-center text-[#4d7a4d] hover:border-[#39e07a] hover:text-[#39e07a] transition-colors">
                  <Download size={13} />
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider border-b border-[#1a2e1a]">
                  <th className="pb-3 text-left font-normal">COLLABORATOR</th>
                  <th className="pb-3 text-left font-normal">WALLET ADDRESS</th>
                  <th className="pb-3 text-left font-normal">ROLE</th>
                  <th className="pb-3 text-right font-normal">SHARE %</th>
                  <th className="pb-3 text-right font-normal">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {song.collaborators.map((c, i) => (
                  <tr key={i} className="border-b border-[#1a2e1a] last:border-0 hover:bg-[#0d160d] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {c.avatar ? (
                          <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-[#1a2e1a]" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#1a2e1a] flex items-center justify-center border border-[#2a3e2a]">
                            <span className="text-xs font-mono text-[#4d7a4d]">H2</span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-[#e0ffe0]">{c.name}</div>
                          <div className="text-xs text-[#4d7a4d]">{c.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-mono text-[#39e07a]">{c.walletAddress}</td>
                    <td className="py-4">
                      <span className="text-xs font-mono border border-[#1a2e1a] text-[#8aaa8a] px-2 py-0.5 rounded">
                        {c.role}
                      </span>
                    </td>
                    <td className="py-4 text-right text-sm font-mono text-[#e0ffe0]">{c.share}</td>
                    <td className="py-4 text-right">
                      {c.status === 'Treasury' ? (
                        <span className="text-xs text-[#4d7a4d] flex items-center justify-end gap-1">
                          <CheckCircle size={11} className="text-[#4d7a4d]" />
                          Treasury
                        </span>
                      ) : (
                        <span className="text-xs text-[#39e07a] flex items-center justify-end gap-1">
                          <CheckCircle size={11} />
                          {c.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-5 pt-5 border-t border-[#1a2e1a] text-center">
              <a href="#" className="text-sm text-[#39e07a] hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                View Full Transaction History on Etherscan
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
