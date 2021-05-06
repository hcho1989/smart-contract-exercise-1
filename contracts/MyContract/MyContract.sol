//contracts/MyContract.sol
//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ILendingPool as IAaveLendingPool} from "../interfaces/ILendingPool.sol";
import {ILendingPoolAddressesProvider as IAaveLendingPoolAddressesProvider} from "../interfaces/ILendingPoolAddressesProvider.sol";
import "../interfaces/IMyContract.sol";


contract MyContract is Initializable, ContextUpgradeable, IMyContract {

  // On mainnet shall I expose this for the sake of transparency?
  IAaveLendingPool private aave_addr;

  // 1. takes aave addr provider address
  // 2. use the provider to resolve lending pool addr
  // 3. set the lending pool address
  function initialize(address aave_addr_prvd) public initializer {
    IAaveLendingPoolAddressesProvider addr_prvd = IAaveLendingPoolAddressesProvider(aave_addr_prvd);
    address _aave_address = addr_prvd.getLendingPool();
    _setAaveLendingPoolAddress(_aave_address);
  }

  // calls aave deposit
  function deposit(address _erc20Contract, uint256 _amount) external override returns (bool) {
    aave_addr.deposit(_erc20Contract, _amount, msg.sender, 0);
    return true;
  }
  // calls aave withdraw
  function withdraw(address _erc20Contract, uint256 _amount) external override returns (uint256) {
    return aave_addr.withdraw(_erc20Contract, _amount, msg.sender); 
  }

  // calls aave getUserAccountData and get the total collateral in ETH
  function checkCollateralValueInEth() public override view returns (uint256) {
    (uint256 totalCollateralETH, , , , , ) = aave_addr.getUserAccountData(msg.sender);
    return totalCollateralETH;
  }

  // set aave lending pool address
  function _setAaveLendingPoolAddress(address addr) private {
    aave_addr = IAaveLendingPool(addr);
  }
}
