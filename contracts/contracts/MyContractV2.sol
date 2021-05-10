//contracts/MyContract.sol
//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {ILendingPool as IAaveLendingPool} from "../interfaces/ILendingPool.sol";
import {DataTypes as AaveDataTypes} from "../types/DataTypes.sol";
import {ILendingPoolAddressesProvider as IAaveLendingPoolAddressesProvider} from "../interfaces/ILendingPoolAddressesProvider.sol";
import "../interfaces/IMyContract.sol";


contract MyContractV2 is Initializable, ContextUpgradeable, IMyContract {

  IAaveLendingPool private aaveLendingPool;

  // initializer function to be called, does the following:
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

    // transfer the approved token _erc20Contract, from sender to the contract address
    IERC20Upgradeable(_erc20Contract).transferFrom(msg.sender, address(this), _amount);
    // approve aave to transfer _erc20Contract for an amount of _amount, out from the contract address
    IERC20Upgradeable(_erc20Contract).approve(address(aaveLendingPool), _amount);
    // call deposit, atoken to sender
    aaveLendingPool.deposit(_erc20Contract, _amount, msg.sender, 0);
    return true;
  }
  // calls aave withdraw
  function withdraw(address _erc20Contract, uint256 _amount) external override returns (uint256) {
    // get the atoken address from lending pool
    address aTokenAddress = aaveLendingPool.getReserveData(_erc20Contract).aTokenAddress;

    // transfer the approved atoken, from sender to the contract address
    IERC20Upgradeable(aTokenAddress).transferFrom(msg.sender, address(this), _amount);
    // approve aave to transfer atoken for an amount of _amount, out from the contract address
    IERC20Upgradeable(aTokenAddress).approve(address(aaveLendingPool), _amount);
    // call withdraw, underlying token to sender
    return aaveLendingPool.withdraw(_erc20Contract, _amount, msg.sender); 
  }

  // calls aave getUserAccountData and get the total collateral in ETH
  function checkCollateralValueInEth() public override view returns (uint256) {
    (uint256 totalCollateralETH, , , , , ) = aaveLendingPool.getUserAccountData(msg.sender);
    return totalCollateralETH;
  }

  // shall I expose this for the sake of transparency?
  function getAaveLendingPoolAddress() public view returns (address) {
    return address(aaveLendingPool);
  }

  // set aave lending pool address
  function _setAaveLendingPoolAddress(address addr) private {
    aaveLendingPool = IAaveLendingPool(addr);
  }

  function helloWorld() public view returns (address) {
    return address(aaveLendingPool);
  }
}
