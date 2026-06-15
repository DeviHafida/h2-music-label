const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const MusicRoyalty = await ethers.getContractFactory("MusicRoyalty");
  const contract = await MusicRoyalty.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log("MusicRoyalty deployed to:", contractAddress);

  console.log("Menjalankan simulasi data awal...");
  
  const collaborators = [deployer.address];
  const shares = [100];
  
  const regTx = await contract.registerSong("Lagu Demo UAS", "Artis Lokal", "Pop", collaborators, shares);
  await regTx.wait();
  console.log("Sukses mendaftarkan Lagu ID #1!");

  const playTx = await contract.playSong(1, { value: ethers.parseEther("1.0") });
  await playTx.wait();
  console.log("Sukses memutar lagu! Saldo royalti 1 ETH masuk ke kontrak.");

  console.log("Siap ditransaksikan di frontend!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});