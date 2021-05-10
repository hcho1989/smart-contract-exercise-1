// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {run, ethers, upgrades} from "hardhat";

const aaveContractAddress = process.env.KOVAN_AAVE_LENDING_POOL_ADDR_PRVD_ADDRESS as string;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  await run('compile');

  // We get the contract to deploy
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
