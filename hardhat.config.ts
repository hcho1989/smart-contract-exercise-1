import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/config";
import 'tsconfig-paths/register';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.7.3",
};

export default config;