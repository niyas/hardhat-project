const { expect } = require('chai');
const { ethers } = require("hardhat");

// Start test block
describe('CodeNinja', function () {
  before(async function () {
    this.CodeNinja = await ethers.getContractFactory('CodeNinja');
  });

  beforeEach(async function () {
    this.codeNinja = await ethers.deployContract("CodeNinja");
    //this.codeNinja = await this.CodeNinja.deploy();
    //await this.codeNinja.deployed();

    this.decimals = await this.codeNinja.decimals();

    const signers = await ethers.getSigners();

    this.ownerAddress = signers[0].address;
    this.recipientAddress = signers[1].address;

    this.signerContract = this.codeNinja.connect(signers[1]);
  });

  // Test cases
  it('Creates a token with a name', async function () {
    expect(await this.codeNinja.name()).to.exist;
    // expect(await this.codeNinja.name()).to.equal('codeNinja');
  });

  it('Creates a token with a symbol', async function () {
    expect(await this.codeNinja.symbol()).to.exist;
    // expect(await this.codeNinja.symbol()).to.equal('FUN');
  });

  it('Has a valid decimal', async function () {
    expect((await this.decimals).toString()).to.equal('18');
  })

  it('Has a valid total supply', async function () {
    const expectedSupply = ethers.utils.parseUnits('1000000', this.decimals);
    expect((await this.codeNinja.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it('Is able to query account balances', async function () {
    const ownerBalance = await this.codeNinja.balanceOf(this.ownerAddress);
    expect(await this.codeNinja.balanceOf(this.ownerAddress)).to.equal(ownerBalance);
  });

  it('Transfers the right amount of tokens to/from an account', async function () {
    const transferAmount = 1000;
    await expect(this.codeNinja.transfer(this.recipientAddress, transferAmount)).to.changeTokenBalances(
        this.codeNinja,
        [this.ownerAddress, this.recipientAddress],
        [-transferAmount, transferAmount]
      );
  });

  it('Emits a transfer event with the right arguments', async function () {
    const transferAmount = 100000;
    await expect(this.codeNinja.transfer(this.recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals)))
        .to.emit(this.codeNinja, "Transfer")
        .withArgs(this.ownerAddress, this.recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals))
  });

});