const hre = require("hardhat");

async function main() {
  console.log("Sedang memulai proses deploy contract...");

  // Mengambil contract factory dari artifacts
  const MusicRoyalty = await hre.ethers.getContractFactory("MusicRoyalty");
  
  // Proses deploy ke jaringan
  const contract = await MusicRoyalty.deploy();
  
  // MENGGUNAKAN SINTAKS BARU (Ethers v6)
  await contract.waitForDeployment(); 

  // MENGGUNAKAN .getAddress() UNTUK FORMAT BARU
  const contractAddress = await contract.getAddress();

  console.log("====================================================");
  console.log(`PROSES BERHASIL!`);
  console.log(`MusicRoyalty Smart Contract Address: ${contractAddress}`);
  console.log("====================================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});