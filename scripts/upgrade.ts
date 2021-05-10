import { ethers, upgrades } from "hardhat";

async function main() {
  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const mc2 = await upgrades.upgradeProxy(process.env.KOVAN_MY_CONTRACT_ADDRESS as string, MyContractV2);
  console.log("MyContractV2 upgraded to: ", mc2);
}

// exit with 1 if error is catched
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
