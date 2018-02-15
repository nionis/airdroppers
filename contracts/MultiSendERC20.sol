pragma solidity 0.4.19;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract MultiSendERC20 is Ownable {

  function multiSend(address _tokenAddr, address[] recipients, uint256[] amounts) external onlyOwner {
    require(recipients.length == amounts.length);
    ERC20 token = ERC20(_tokenAddr);

    for (uint256 i = 0; i < recipients.length; i++) {
      token.transfer(recipients[i], amounts[i]);
    }
  }

  function withdraw (address _tokenAddr) external onlyOwner {
    ERC20 token = ERC20(_tokenAddr);

    uint256 balance = token.balanceOf(this);
    token.transfer(owner, balance);
  }
}