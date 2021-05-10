import {ethers, upgrades} from "hardhat";

const aaveContractAddress = process.env.KOVAN_AAVE_LENDING_POOL_ADDR_PRVD_ADDRESS as string;

async function main() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const mc = await upgrades.deployProxy(MyContract, [ethers.utils.getAddress(aaveContractAddress)]);
  await mc.deployed();
  console.log("MyContract deployed to:", mc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
