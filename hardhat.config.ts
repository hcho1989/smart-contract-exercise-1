import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-waffle";
import "tsconfig-paths/register";
import * as dotenv from "dotenv";
import { task, HardhatUserConfig } from "hardhat/config";

dotenv.config({ path: __dirname+'/.env' });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{version: "0.8.4"}, {version: "0.7.6"}, {version: "0.6.12"}]
  },
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ROPSTEN_ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`]
    }

  }
};

export default config;
