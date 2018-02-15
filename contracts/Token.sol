pragma solidity 0.4.19;

import "zeppelin-solidity/contracts/token/ERC20/BasicToken.sol";


contract Token is BasicToken {
  string public constant name = "Token";
  string public constant symbol = "tkn";
  uint8 public constant decimals = 18;
  uint256 public constant INITIAL_SUPPLY = 100 * (10 ** uint256(decimals));

  function Token() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }
}