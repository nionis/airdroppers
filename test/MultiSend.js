const MultiSend = artifacts.require("MultiSend");

contract("MultiSend", function(accounts) {
  const [owner, recipient1, recipient2] = accounts;
  let multiSend;

  beforeEach(async function() {
    multiSend = await MultiSend.new();
  });

  it("send all to recipient1", async function() {
    let multiSendBalance = 0;
    let recipient1Balance = 0;

    // send ether to contract
    await web3.eth.sendTransaction({
      from: owner,
      to: multiSend.address,
      value: web3.toWei(1, "ether")
    });

    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(1, "ether")));

    // send ether to addresses
    await multiSend.multiSend([recipient1], [web3.toWei(1, "ether")]);

    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(0));

    recipient1Balance = await web3.eth.getBalance(recipient1);
    assert.isTrue(recipient1Balance.equals(web3.toWei(101, "ether")));
  });

  it("send half to recipient1", async function() {
    let multiSendBalance = 0;
    let recipient1Balance = 0;

    // send ether to contract
    await web3.eth.sendTransaction({
      from: owner,
      to: multiSend.address,
      value: web3.toWei(1, "ether")
    });

    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(1, "ether")));

    // send ether to addresses
    await multiSend.multiSend([recipient1], [web3.toWei(0.5, "ether")]);

    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(0.5, "ether")));

    recipient1Balance = await web3.eth.getBalance(recipient1);
    assert.isTrue(recipient1Balance.equals(web3.toWei(101.5, "ether")));

    // withdraw
    await multiSend.withdraw();
    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(0));
  });

  it("send half to all recipients", async function() {
    let multiSendBalance = 0;
    let recipient1Balance = 0;

    // send ether to contract
    await web3.eth.sendTransaction({
      from: owner,
      to: multiSend.address,
      value: web3.toWei(1, "ether")
    });

    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(1, "ether")));

    // send ether to addresses
    await multiSend.multiSend(
      [recipient1, recipient2],
      [web3.toWei(0.5, "ether"), web3.toWei(0.5, "ether")]
    );

    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(0));

    recipient1Balance = await web3.eth.getBalance(recipient1);
    assert.isTrue(recipient1Balance.equals(web3.toWei(102, "ether")));

    recipient2Balance = await web3.eth.getBalance(recipient2);
    assert.isTrue(recipient2Balance.equals(web3.toWei(100.5, "ether")));
  });
});
