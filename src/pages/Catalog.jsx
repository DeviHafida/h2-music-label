import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown, Headphones, Coins, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import { songs } from '../data/mockData';

const genres = ['All Genres', 'SYNTHWAVE', 'AMBIENT', 'TECHNO', 'BASS'];
const sortOptions = ['Recent', 'Most Plays', 'Highest Earned'];

export default function Catalog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All Genres');
  const [sort, setSort] = useState('Recent');
  const [page, setPage] = useState(1);

  const filtered = songs.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
    const matchGenre = genre === 'All Genres' || s.genre === genre;
    return matchSearch && matchGenre;
  });

  const perPage = 8;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-8 pb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#e0ffe0]">Daftar Lagu</h1>
            <p className="text-sm text-[#8aaa8a] mt-1 max-w-md">
              Browse and manage your decentralized music catalog. Real-time royalty tracking and on-chain streaming analytics enabled.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="card px-5 py-3 text-center min-w-[110px]">
              <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider">TOTAL TRACKS</div>
              <div className="text-xl font-bold text-[#e0ffe0]">1,284</div>
            </div>
            <div className="card px-5 py-3 text-center min-w-[120px] border-[#39e07a33]">
              <div className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider">AVG. ROYALTY</div>
              <div className="text-xl font-bold text-[#e0ffe0]">$0.04</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d7a4d]" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search track title, artist, or ISRC..."
              className="input-field pl-9"
            />
          </div>

          <div className="relative">
            <select
              value={genre}
              onChange={(e) => { setGenre(e.target.value); setPage(1); }}
              className="input-field pr-8 appearance-none cursor-pointer w-36"
            >
              {genres.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4d7a4d] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field pr-8 appearance-none cursor-pointer w-40"
            >
              {sortOptions.map((s) => <option key={s} value={s}>Sort By: {s}</option>)}
            </select>
            <SlidersHorizontal size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4d7a4d] pointer-events-none" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {paginated.map((song) => (
            <div
              key={song.id}
              onClick={() => navigate(`/song/${song.id}`)}
              className="card overflow-hidden cursor-pointer hover:border-[#39e07a33] hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111d11] via-transparent to-transparent" />
                {song.isNew && (
                  <div className="absolute top-3 left-3 bg-[#39e07a] text-[#050c05] text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    NEW RELEASE
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="font-semibold text-[#e0ffe0] text-sm mb-0.5">{song.title}</div>
                <div className="text-xs text-[#4d7a4d] mb-4">{song.artist}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[9px] font-mono text-[#4d7a4d] uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Headphones size={9} /> PLAYS
                    </div>
                    <div className="text-sm font-semibold text-[#e0ffe0]">{song.plays}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#4d7a4d] uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Coins size={9} /> EARNED
                    </div>
                    <div className="text-sm font-semibold text-[#39e07a]">{song.earned}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-[#1a2e1a] flex items-center justify-center text-[#8aaa8a] hover:border-[#39e07a] hover:text-[#39e07a] transition-colors disabled:opacity-40"
              disabled={page === 1}
            >
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-mono font-semibold transition-all ${
                  page === p
                    ? 'bg-[#39e07a] text-[#050c05]'
                    : 'border border-[#1a2e1a] text-[#8aaa8a] hover:border-[#39e07a] hover:text-[#39e07a]'
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-[#4d7a4d] text-sm px-1">...</span>
            <button
              onClick={() => setPage(12)}
              className={`w-8 h-8 rounded-lg text-sm font-mono transition-all ${
                page === 12
                  ? 'bg-[#39e07a] text-[#050c05]'
                  : 'border border-[#1a2e1a] text-[#8aaa8a] hover:border-[#39e07a] hover:text-[#39e07a]'
              }`}
            >
              12
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="w-8 h-8 rounded-lg border border-[#1a2e1a] flex items-center justify-center text-[#8aaa8a] hover:border-[#39e07a] hover:text-[#39e07a] transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
