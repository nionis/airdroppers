pragma solidity 0.4.19;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract MultiSend is Ownable {

  function multiSend(address[] recipients, uint256[] amounts) external payable onlyOwner {
    require(recipients.length == amounts.length);

    for (uint256 i = 0; i < recipients.length; i++) {
      recipients[i].transfer(amounts[i]);
    }
  }

  function withdraw () external onlyOwner {
    owner.transfer(this.balance);
  }

  function () external payable {}
}