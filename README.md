
# H2 Music Label
## Blockchain Music Royalty Management
 
---
 
## Deskripsi Sistem
 
H2 Music Label adalah aplikasi terdesentralisasi (DApp) berbasis teknologi blockchain yang dirancang untuk mengelola distribusi royalti musik secara transparan, adil, dan otomatis. Sistem ini memotong rantai birokrasi pembayaran royalti konvensional yang rumit dan rentan terhadap keterlambatan pembayaran serta manipulasi data.
 
Melalui integrasi smart contract, hak ekonomi dari para kreator, artis, maupun kolaborator dihitung secara otomatis dan didistribusikan secara real-time ke dalam akun masing-masing segera setelah sebuah lagu diputar oleh pengguna. Seluruh data pemutaran dan aliran finansial dicatat secara permanen di atas jaringan blockchain sehingga tidak dapat diubah oleh pihak mana pun (immutable).
 
### Fitur Utama
 
- Otentikasi identitas pengguna berbasis dompet digital (Wallet Authentication) melalui MetaMask
- Registrasi dan pencatatan kepemilikan lagu baru on-chain
- Distribusi royalti otomatis berbasis performa pemutaran lagu
- Penarikan saldo royalti (Claim Royalty) langsung ke dompet digital kolaborator
- Visualisasi grafik kontribusi persentase kepemilikan saham serta pelacakan performa royalti secara real-time
---
 
## Teknologi yang Digunakan
 
### Frontend
 
| Teknologi | Keterangan |
|---|---|
| React.js / Vite | Framework antarmuka pengguna dan build tool |
| ethers.js (v6) | Library penghubung antara aplikasi frontend dengan node blockchain |
| Tailwind CSS & Lucide React | Framework desain UI dan ikonografi sistem |
| Recharts | Library visualisasi data untuk grafik distribusi saham |
 
### Blockchain & Environment
 
| Teknologi | Keterangan |
|---|---|
| Solidity (^0.8.19) | Bahasa pemrograman untuk menyusun logika smart contract |
| Hardhat | Lingkungan pengembangan lokal untuk kompilasi, pengujian, dan deployment kontrak |
| MetaMask | Ekstensi browser sebagai penyedia signer dan penandatangan transaksi |
 
---
 
## Arsitektur Sistem
 
Sistem ini mengadopsi arsitektur aplikasi terdesentralisasi tiga lapisan murni:
 
```
Frontend (React.js)
        │
        ▼
   ethers.js (v6)
        │
        ▼
Smart Contract (Solidity)
        │
        ▼
Local Blockchain (Hardhat Node)
```
 
---
 
## Alur Kerja Sistem
 
1. **Koneksi Jaringan** — Pengguna menghubungkan dompet MetaMask ke aplikasi menggunakan konfigurasi RPC lokal.
2. **Pendaftaran Objek** — Kreator mendaftarkan metadata lagu baru beserta daftar alamat wallet kolaborator dan persentase pembagian haknya.
3. **Eksekusi Komputasi** — Setiap kali lagu diputar, smart contract memecah nilai ETH yang masuk dan memasukkannya ke dalam saldo simpanan masing-masing kolaborator.
4. **Kliring Dana** — Kolaborator melakukan pemanggilan fungsi klaim untuk mentransfer saldo simpanan dari kontrak pintar langsung ke alamat MetaMask pribadi mereka.
---
 
## Struktur Proyek
 
```
music-royalty-system/
│
├── contracts/
│   ├── artifacts/               # Hasil kompilasi smart contract (ABI)
│   ├── cache/                   # Cache internal Hardhat
│   ├── contracts/
│   │   └── MusicRoyalty.sol     # Smart contract Solidity
│   ├── scripts/
│   │   └── deploy.cjs           # Skrip deploy dan simulasi data awal
│   ├── hardhat.config.cjs       # Konfigurasi jaringan dan kompiler Hardhat
│   └── package.json
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/          # Komponen UI global (Navbar, Footer, Ticker)
│       ├── data/                # File konfigurasi metadata lokal
│       ├── hooks/               # Custom hooks manajemen state wallet
│       ├── lib/
│       │   └── ethersIntegration.js  # Jembatan fungsi utama ethers.js
│       ├── pages/               # Halaman aplikasi (Catalog, WalletPage, SongDetail)
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```
 
---
 
## Spesifikasi Smart Contract
 
Kontrak pintar `MusicRoyalty.sol` dirancang dengan memenuhi standarisasi kelulusan teknis akademis.
 
### Struktur Data
 
- **Struct Song** — Enkapsulasi metadata lagu
- **Mapping ganda** — Mencatat data lagu serta saldo royalti tertunda per alamat wallet
### Fungsi Transaksi (Write)
 
| Fungsi | Deskripsi |
|---|---|
| `registerSong()` | Mendaftarkan lagu baru |
| `playSong()` | Mendistribusikan dana royalti berdasarkan pemutaran |
| `claimRoyalty()` | Menarik dana royalti on-chain ke wallet pengguna |
 
### Fungsi Pembacaan (Read/View)
 
| Fungsi | Deskripsi |
|---|---|
| `getSongDetails()` | Mengambil informasi detail spesifik satu lagu |
| `getAllSongs()` | Mengambil seluruh array lagu untuk halaman katalog |
| `getTotalSongs()` | Mengambil total counter jumlah lagu |
 
### Validasi & Logging
 
- **Validasi Keamanan** — Memanfaatkan instruksi `require()` untuk memastikan total shares berjumlah tepat 100% dan ID lagu valid
- **Logging System** — Event `SongRegistered`, `SongPlayed`, dan `RoyaltyClaimed` untuk mencatat riwayat aktivitas pada log blockchain
---
 
## Cara Menjalankan Proyek
 
### Prasyarat
 
- Node.js terinstal
- Google Chrome dengan ekstensi MetaMask
---
 
### Langkah 1 — Inisialisasi Blockchain Lokal
 
Buka Terminal 1, masuk ke direktori `contracts`, instal dependensi, lalu nyalakan Hardhat Node:
 
```bash
cd contracts
npm install
npx hardhat node --hostname 127.0.0.1
```
 
> Biarkan terminal ini tetap berjalan di latar belakang selama aplikasi digunakan.
 
---
 
### Langkah 2 — Kompilasi dan Deploy Smart Contract
 
Buka Terminal 2, jalankan skrip deployment untuk mengunggah kontrak pintar sekaligus mengeksekusi simulasi saldo awal:
 
```bash
cd contracts
npx hardhat run scripts/deploy.cjs --network localhost
```
 
Salin nilai **Contract Address** yang muncul pada baris log terminal setelah skrip berhasil dieksekusi.
 
---
 
### Langkah 3 — Konfigurasi Alamat Kontrak di Frontend
 
Buka berkas `frontend/src/lib/ethersIntegration.js` menggunakan editor kode, lalu perbarui nilai variabel berikut menggunakan alamat yang telah disalin dari langkah sebelumnya:
 
```javascript
export const ROYALTY_CONTRACT_ADDRESS = 'ALAMAT_KONTRAK_HASIL_DEPLOY_ANDA';
```
 
---
 
### Langkah 4 — Menjalankan Server Frontend
 
Masih di Terminal 2, pindah ke direktori `frontend`, lakukan instalasi modul, dan nyalakan server lokal Vite:
 
```bash
cd ../frontend
npm install
npm run dev
```
 
Buka Google Chrome dan akses alamat berikut:
 
```
http://localhost:5173
```
 
---
 
### Langkah 5 — Pengaturan MetaMask
 
Hubungkan dompet MetaMask ke jaringan lokal RPC dengan konfigurasi berikut:
 
| Parameter | Nilai |
|---|---|
| RPC URL | `http://127.0.0.1:8545` |
| Chain ID | `1337` |
 
Impor salah satu Private Key akun uji coba yang disediakan oleh Hardhat Node di Terminal 1 ke dalam MetaMask.
 
Sebelum melakukan uji coba transaksi klaim, bersihkan riwayat transaksi lokal agar tidak terjadi tabrakan nonce blockchain:
 
> Buka MetaMask, masuk ke **Settings > Advanced / Developer Tools**, lalu klik **Delete activity and nonce data**.
 