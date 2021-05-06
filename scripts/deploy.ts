// scripts/deploy.js
import { ethers, upgrades } from "hardhat";

async function main() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const mc = await upgrades.deployProxy(MyContract, [42]);
  await mc.deployed();
  console.log("MyContract deployed to:", mc.address);
}

main();
