import { useState, useRef } from 'react';
import { Music, Users, Plus, Trash2, Upload, Image, FileAudio, CheckCircle, ChevronDown, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const genres = [
  'Electronic / Future Bass',
  'Synthwave',
  'Ambient',
  'Techno',
  'Bass',
  'House',
  'Drum & Bass',
  'Hip-Hop',
  'R&B',
  'Pop',
];

export default function UploadSong() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('Electronic / Future Bass');
  const [collaborators, setCollaborators] = useState([
    { name: 'Main Artist', wallet: '0x...', role: 'Producer', share: '100' },
  ]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const coverInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const totalShare = collaborators.reduce((acc, c) => acc + (parseFloat(c.share) || 0), 0);
  const isValid = totalShare === 100;

  const addCollaborator = () => {
    setCollaborators([...collaborators, { name: '', wallet: '0x...', role: 'Producer', share: '0' }]);
  };

  const removeCollaborator = (i) => {
    setCollaborators(collaborators.filter((_, idx) => idx !== i));
  };

  const updateCollaborator = (i, field, value) => {
    setCollaborators(collaborators.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  };

  const handleCoverDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleAudioSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setAudioFile(file);
  };

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 pt-8 pb-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#39e07a]">Upload Track</h1>
          <p className="text-[#8aaa8a] mt-2">
            Mint your musical assets directly to the blockchain with automated royalty splits.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Song Details */}
            <div className="card p-6">
              <h2 className="flex items-center gap-2 font-semibold text-[#e0ffe0] text-base mb-5">
                <Music size={16} className="text-[#39e07a]" />
                Song Details
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-2">SONG TITLE</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter song name..."
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-2">ARTIST NAME</label>
                  <input
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Featured or primary artist..."
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-2">GENRE</label>
                <div className="relative">
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="input-field appearance-none pr-8 cursor-pointer"
                  >
                    {genres.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4d7a4d] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Collaborator Management */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2 font-semibold text-[#e0ffe0] text-base">
                  <Users size={16} className="text-[#39e07a]" />
                  Collaborator Management
                </h2>
                <button
                  onClick={addCollaborator}
                  className="flex items-center gap-1 text-xs text-[#39e07a] hover:brightness-110 transition-all font-medium"
                >
                  <Plus size={12} />
                  + Tambah Kolaborator
                </button>
              </div>

              <div className="border border-[#1a2e1a] rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-[1fr_1fr_auto_2rem_2rem] gap-0 text-[9px] font-mono text-[#4d7a4d] uppercase tracking-wider bg-[#0d160d] px-3 py-2 border-b border-[#1a2e1a]">
                  <span>NAME</span>
                  <span>WALLET ADDRESS</span>
                  <span>ROLE</span>
                  <span>%</span>
                  <span />
                </div>
                {collaborators.map((c, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto_2rem_2rem] gap-2 items-center px-3 py-2.5 border-b border-[#1a2e1a] last:border-0">
                    <input
                      value={c.name}
                      onChange={(e) => updateCollaborator(i, 'name', e.target.value)}
                      className="bg-[#0d160d] border border-[#1a2e1a] rounded px-2 py-1.5 text-xs text-[#e0ffe0] placeholder-[#4d7a4d] focus:outline-none focus:border-[#39e07a] transition-colors"
                    />
                    <input
                      value={c.wallet}
                      onChange={(e) => updateCollaborator(i, 'wallet', e.target.value)}
                      className="bg-[#0d160d] border border-[#1a2e1a] rounded px-2 py-1.5 text-xs font-mono text-[#39e07a] placeholder-[#4d7a4d] focus:outline-none focus:border-[#39e07a] transition-colors"
                    />
                    <div className="relative">
                      <select
                        value={c.role}
                        onChange={(e) => updateCollaborator(i, 'role', e.target.value)}
                        className="bg-[#0d160d] border border-[#1a2e1a] rounded px-2 py-1.5 text-xs text-[#e0ffe0] appearance-none cursor-pointer focus:outline-none focus:border-[#39e07a] pr-5"
                      >
                        {['Producer', 'Singer', 'Songwriter', 'Label', 'Mixer'].map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      value={c.share}
                      onChange={(e) => updateCollaborator(i, 'share', e.target.value)}
                      type="number"
                      min="0"
                      max="100"
                      className="bg-[#0d160d] border border-[#1a2e1a] rounded px-2 py-1.5 text-xs text-[#e0ffe0] focus:outline-none focus:border-[#39e07a] w-full"
                    />
                    <button
                      onClick={() => removeCollaborator(i)}
                      className="text-[#4d7a4d] hover:text-red-400 transition-colors p-1"
                      disabled={collaborators.length === 1}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-mono ${
                isValid
                  ? 'bg-[#39e07a10] border-[#39e07a33] text-[#39e07a]'
                  : 'bg-red-900/10 border-red-800/30 text-red-400'
              }`}>
                <CheckCircle size={14} />
                Total Share: {totalShare}% ({isValid ? 'Valid' : 'Must equal 100%'})
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Media Assets */}
            <div className="card p-6">
              <h2 className="flex items-center gap-2 font-semibold text-[#e0ffe0] text-base mb-5">
                <Upload size={16} className="text-[#39e07a]" />
                Media Assets
              </h2>

              <label className="block text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-2">
                COVER IMAGE (DRAG & DROP)
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleCoverDrop}
                onClick={() => coverInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl h-44 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 mb-5 overflow-hidden relative ${
                  isDragOver ? 'border-[#39e07a] bg-[#39e07a08]' : 'border-[#1a2e1a] hover:border-[#39e07a44] hover:bg-[#39e07a05]'
                }`}
              >
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <Image size={32} className="text-[#1a2e1a] mb-2" />
                    <span className="text-sm text-[#4d7a4d]">Click to upload or drag image</span>
                    <span className="text-xs text-[#2a3e2a] mt-1">JPG, PNG (Max 5MB)</span>
                  </>
                )}
                <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverSelect} className="hidden" />
              </div>

              <label className="block text-[10px] font-mono text-[#4d7a4d] uppercase tracking-wider mb-2">AUDIO FILE</label>
              <div className="bg-[#0d160d] border border-[#1a2e1a] rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a2e1a] flex items-center justify-center">
                    <FileAudio size={14} className="text-[#39e07a]" />
                  </div>
                  <span className="text-sm text-[#4d7a4d]">
                    {audioFile ? audioFile.name : 'Choose WAV or FLAC for best quality'}
                  </span>
                </div>
                <button
                  onClick={() => audioInputRef.current?.click()}
                  className="btn-outline text-xs px-3 py-1.5"
                >
                  Select
                </button>
                <input ref={audioInputRef} type="file" accept="audio/*" onChange={handleAudioSelect} className="hidden" />
              </div>
            </div>

            {/* Register Button */}
            <div className="card p-6 border-[#39e07a22]">
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full bg-[#39e07a] text-[#050c05] font-bold text-base py-4 rounded-xl flex items-center justify-center gap-3 hover:brightness-110 active:brightness-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={18} />
                    Registered Successfully!
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    Register Song on Blockchain
                  </>
                )}
              </button>
              <p className="text-xs text-[#4d7a4d] text-center mt-3">
                By registering, you agree to the Smart Contract Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
