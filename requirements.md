## Design a solidity contract which implements the following interface:

```
interface MyContract {

    /// @dev Deposit ERC20 tokens on behalf of msg.sender to Aave Protocol
    /// @param _erc20Contract The address fo the underlying asset to deposit to Aave Protocol v2
    /// @param _amount The amount of the underlying asset to deposit
    /// @return success Whether the deposit operation was successful or not
    function deposit(address _erc20Contract, uint256 _amount) external returns (bool success);

    /// @dev Withdraw ERC20 tokens on behalf of msg.sender from Aave Protocol
    /// @param _erc20Contract The address of the underlyng asset being withdrawn
    /// @param _amount The amount to be withdrawn
    /// @return amountWithdrawn The actual amount withdrawn from Aave
    function withdraw(address _erc20Contract, uint256 _amount) external returns (uint256 amountWithdrawn);

    /// @dev Read only function 
    /// @return amountInEth Returns the value locked as collateral posted by msg.sender
    function checkCollateralValueInEth() public view returns (uint256 amountInEth);
}
```
MyContract needs to be upgradeable, in case you decide the change the logic after its deployed but want to reuse the same contract address.
   

## Write a test script(javascript or typescript) 

write test which supplies some USDT(ERC20) Tokens which uses this contract on Kovan testnet to do the following:

1. supply assets to Aave's contracts on Kovan Testnet 
2. read value of users collateral locked in Aave (in Eth)
3. redeem assets 
   
notes:

- you can use JSON RPC and Web3.js or EtherJS for interacting with MyContract.
- you may have to fund the test account with some eth using a faucet and use the eth to acquire USDT on Kovan testnet


