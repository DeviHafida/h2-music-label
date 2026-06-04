# H2 Music Label - Blockchain Music Royalty Management

## Deskripsi Sistem

H2 Music Label adalah aplikasi berbasis blockchain yang dirancang untuk mengelola distribusi royalti musik secara transparan dan otomatis. Sistem ini memungkinkan label musik, artis, dan kolaborator untuk mencatat kepemilikan lagu serta membagikan royalti berdasarkan persentase yang telah ditentukan dalam smart contract.

Setiap transaksi royalti dicatat pada blockchain Ethereum sehingga data tidak dapat dimanipulasi dan dapat diverifikasi oleh seluruh pihak yang terlibat.

Fitur utama sistem:

* Connect Wallet menggunakan MetaMask
* Upload dan registrasi lagu
* Menampilkan daftar lagu yang terdaftar
* Menampilkan detail lagu dan informasi kolaborator
* Distribusi royalti berbasis smart contract
* Klaim royalti oleh kolaborator
* Monitoring total royalti yang telah terkumpul

---

## Teknologi yang Digunakan

### Frontend

* React
* Vite
* React Router DOM
* Tailwind CSS
* ethers.js

### Blockchain

* Solidity
* Hardhat
* Ethereum (Local Hardhat Network / Sepolia Testnet)

### Wallet

* MetaMask

---

## Arsitektur Sistem

```text
Frontend (React)
        │
        ▼
     ethers.js
        │
        ▼
Smart Contract (Solidity)
        │
        ▼
Ethereum Blockchain
(Hardhat Local / Sepolia)
```

### Alur Sistem

1. User menghubungkan MetaMask ke aplikasi.
2. Label mendaftarkan lagu melalui smart contract.
3. Data lagu disimpan di blockchain.
4. User memutar lagu dan transaksi royalti dicatat.
5. Royalti didistribusikan berdasarkan persentase kolaborator.
6. Kolaborator dapat melakukan klaim royalti ke wallet masing-masing.

---

## Struktur Project

```text
final-project/
│
├── contracts/
│   ├── contracts/
│   │   └── MusicRoyalty.sol
│   ├── scripts/
│   └── hardhat.config.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── lib/
│       ├── data/
│       ├── App.js
│       └── main.js
│
├── README.md
└── demo-video.mp4
```

---

## Fitur Sistem

### 1. Connect Wallet

Menghubungkan MetaMask sebagai identitas pengguna.

### 2. Upload Lagu

Mendaftarkan lagu baru beserta informasi kolaborator dan persentase royalti.

### 3. Daftar Lagu

Menampilkan seluruh lagu yang telah terdaftar pada sistem.

### 4. Detail Lagu

Menampilkan metadata lagu, daftar kolaborator, persentase royalti, dan total royalti yang telah terkumpul.

### 5. Klaim Royalti

Kolaborator dapat menarik saldo royalti yang menjadi haknya.

### 6. Progress Royalti

Visualisasi perkembangan total royalti yang telah terkumpul.

---

## Smart Contract

Smart contract dikembangkan menggunakan Solidity dan memenuhi ketentuan project:

* Menggunakan Struct
* Menggunakan Mapping
* Memiliki minimal 2 fungsi transaksi (write)
* Memiliki minimal 1 fungsi pembacaan data (read)
* Menggunakan Event
* Menggunakan Validasi (require)

---

## Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone <repository-url>
cd final-project
```

### 2. Install Dependency Frontend

```bash
cd frontend
npm install
```

### 3. Jalankan Frontend

```bash
npm run dev
```

Frontend akan berjalan pada:

```text
http://localhost:5173
```

### 4. Jalankan Hardhat

Masuk ke folder contracts:

```bash
cd contracts
npm install
```

Menjalankan local blockchain:

```bash
npx hardhat node
```

Deploy smart contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Hubungkan MetaMask

Tambahkan jaringan Hardhat Local atau Sepolia ke MetaMask dan gunakan akun yang tersedia untuk melakukan transaksi.

---

## Hasil yang Diharapkan

* Smart contract berhasil dideploy
* MetaMask berhasil terhubung
* Data lagu tersimpan pada blockchain
* Minimal satu transaksi berhasil dijalankan
* Data pada frontend berubah sesuai data blockchain
