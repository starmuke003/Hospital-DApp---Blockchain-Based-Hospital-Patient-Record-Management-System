const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("EMRRegistry");

  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  console.log("EMRRegistry contract deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});