const MultiSendERC20 = artifacts.require("MultiSendERC20");
const Token = artifacts.require("Token");

contract("MultiSendERC20", function(accounts) {
  const [owner, recipient1, recipient2] = accounts;
  let token;
  let multiSend;

  beforeEach(async function() {
    token = await Token.new();
    multiSend = await MultiSendERC20.new();
  });

  it("send all to recipient1", async function() {
    let multiSendBalance = 0;
    let recipient1Balance = 0;

    // send tokens to contract
    await token.transfer(multiSend.address, web3.toWei(1, "ether"));

    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(1, "ether")));

    // send tokens to addresses
    await multiSend.multiSend(
      token.address,
      [recipient1],
      [web3.toWei(1, "ether")]
    );

    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(0));

    recipient1Balance = await token.balanceOf(recipient1);
    assert.isTrue(recipient1Balance.equals(web3.toWei(1, "ether")));
  });

  it("send half to recipient1", async function() {
    let multiSendBalance = 0;
    let recipient1Balance = 0;

    // send tokens to contract
    await token.transfer(multiSend.address, web3.toWei(1, "ether"));

    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(1, "ether")));

    // send ether to addresses
    await multiSend.multiSend(
      token.address,
      [recipient1],
      [web3.toWei(0.5, "ether")]
    );

    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(0.5, "ether")));

    recipient1Balance = await token.balanceOf(recipient1);
    assert.isTrue(recipient1Balance.equals(web3.toWei(0.5, "ether")));

    // withdraw
    await multiSend.withdraw(token.address);
    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(0));
  });

  it("send half to all recipients", async function() {
    let multiSendBalance = 0;
    let recipient1Balance = 0;

    // send tokens to contract
    await token.transfer(multiSend.address, web3.toWei(2, "ether"));

    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(2, "ether")));

    // send ether to addresses
    await multiSend.multiSend(
      token.address,
      [recipient1, recipient2],
      [web3.toWei(1.5, "ether"), web3.toWei(0.5, "ether")]
    );

    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(0));

    recipient1Balance = await token.balanceOf(recipient1);
    assert.isTrue(recipient1Balance.equals(web3.toWei(1.5, "ether")));

    recipient2Balance = await token.balanceOf(recipient2);
    assert.isTrue(recipient2Balance.equals(web3.toWei(0.5, "ether")));
  });
});
