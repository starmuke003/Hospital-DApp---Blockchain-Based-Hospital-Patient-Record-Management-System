const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const Contract = await hre.ethers.getContractAt("Lock", contractAddress);

  const unlockTime = await Contract.unlockTime();
  console.log("Unlock time:", unlockTime.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});