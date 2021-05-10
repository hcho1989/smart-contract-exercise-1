import { Contract } from "@ethersproject/contracts";
import {ethers} from "hardhat";
import { IERC20Upgradeable, IMyContract } from "typechain/dist/TypeChain";

import {abi} from "../artifacts/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol/IERC20Upgradeable.json"

const daiContractAddress = process.env.KOVAN_DAI_ADDRESS as string;
const aDaiContractAddress = process.env.KOVAN_ADAI_ADDRESS as string;
const myContractAddr = process.env.KOVAN_MY_CONTRACT_ADDRESS as string;

// signer
const mywallet = new ethers.Wallet(process.env.KOVAN_PRIVATE_KEY as string, ethers.provider);

async function main() {
  console.log("nonce: ", await mywallet.getTransactionCount())
  const myAddress = await mywallet.getAddress();
  
  // token contracts
  const daiContract = (await ethers.getContractAt(abi, daiContractAddress)) as IERC20Upgradeable;
  const aDaiContract = (await ethers.getContractAt(abi, aDaiContractAddress)) as IERC20Upgradeable;
  const myContract = (await ethers.getContractAt("MyContract", myContractAddr)) as IMyContract;
  
  // check balance
  console.log("my balanceOf aDAI", await checkBalance(aDaiContract, myAddress))                                 // 0x00
  console.log("my balanceOf DAI", await checkBalance(daiContract, myAddress))                                   // 0x021e19e0c9bab2400000
  console.log("myContractAddr", myContractAddr)

  const signableDaiContract = daiContract.connect(mywallet);
  const signableMyContract = myContract.connect(mywallet);
  const amountToDeposit = ethers.BigNumber.from("10").pow("18").mul(500)                                        // 500 DAI to deposit
  
  // approve DAI to be transfered
  const txresp = await signableDaiContract.approve(myContractAddr, amountToDeposit);
  await txresp.wait();
  console.log("my allowance DAI for mycontract", await checkAllowance(daiContract, myAddress, myContractAddr))  // 0x1B1AE4D6E2EF500000
  
  // call deposit function
  const txresp2 = await signableMyContract.deposit(daiContractAddress, amountToDeposit, {gasLimit: 500000})
  await txresp2.wait();

  // check balance again
  console.log("my balanceOf DAI", await checkBalance(daiContract, myAddress))                                   // 0x0202fefbf2d7c2f00000
  console.log("my balanceOf aDAI", await checkBalance(aDaiContract, myAddress))                                 // 0x1B1AE4D6E2EF500000
}


async function checkBalance(c: Contract, addr: string): Promise<any> {
  return await c.balanceOf(addr)
}
async function checkAllowance(c: Contract, owner: string, spender: string): Promise<any> {
  return await c.allowance(owner, spender)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
