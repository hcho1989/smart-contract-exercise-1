import { ethers, upgrades } from "hardhat";

async function main() {
  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const mc2 = await upgrades.upgradeProxy(process.env.MY_CONTRACT_ADDRESS as string, MyContractV2);
  console.log("MyContract upgraded to ");
}

main();
