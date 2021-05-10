import {ethers} from "hardhat";

const myContractAddr = process.env.KOVAN_MY_CONTRACT_ADDRESS as string;

async function main() {
  const myContractV2 = await ethers.getContractAt("MyContractV2", myContractAddr);
  console.log("helloWorld, this shall print the lending pool contract address", await myContractV2.helloWorld());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
