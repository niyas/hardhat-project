// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
    console.log('Getting the fun token contract...');
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const codeNinja = await ethers.getContractAt('CodeNinja', contractAddress);
    const signers = await ethers.getSigners();
    const recipientAddress = signers[1].address;
    const ownerAddress = signers[0].address;

    
    await getName(codeNinja);
    await getSymbol(codeNinja);
    await getTotalSupply(codeNinja);
    await getOwnerBalance(codeNinja, signers);
    await transfer(codeNinja, ownerAddress, recipientAddress);
}

// Get the Token Name
async function getSymbol(codeNinja) {
    console.log('Querying token symbol...');
    const symbol = await codeNinja.symbol();
    console.log(`Token Symbol: ${symbol}\n`);
}

// Get the token symbol
async function getName(codeNinja) {
    console.log('Querying token name...');
    const name = await codeNinja.name();
    console.log(`Token Name: ${name}\n`);
}

// Get token decimals
async function getTokenDecimals(codeNinja) {
    console.log('Querying token decimal...');
    const decimals = await codeNinja.decimals();
    console.log(`Token Name: ${decimals}\n`);
}

//Get  the total supply of the Contract
async function getTotalSupply(codeNinja){
    console.log('Querying token supply...');
    const totalSupply = await codeNinja.totalSupply();
    const decimals = await codeNinja.decimals();
    console.log(`Total Supply including all decimals: ${totalSupply}`);
    console.log(`Total supply including all decimals comma separated: ${ethers.utils.commify(totalSupply)}`);
    console.log(`Total Supply in CNJ: ${ethers.utils.formatUnits(totalSupply, decimals)}\n`);

}

// Get the account balance of owner
async function getOwnerBalance(codeNinja, signers){
    console.log('Getting the balance of contract owner...');
    const ownerAddress = signers[0].address;
    const decimals = await codeNinja.decimals();
    let ownerBalance = await codeNinja.balanceOf(ownerAddress);
    console.log(`Owner Balance: ${ethers.utils.formatUnits(ownerBalance, decimals)}\n`);
}

// Transfer of tokens
async function transfer(codeNinja, ownerAddress, recipientAddress) {
    console.log('Initiating a transfer...');
    const symbol = await codeNinja.symbol();
    const decimals = await codeNinja.decimals();
    const transferAmount = 100000;
    console.log(`Transferring ${transferAmount} ${symbol} tokens to ${recipientAddress} from ${ownerAddress}`);
    await codeNinja.transfer(recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), decimals));
    console.log('Transfer completed');
    ownerBalance = await codeNinja.balanceOf(ownerAddress);
    console.log(`Balance of owner (${ownerAddress}): ${ethers.utils.formatUnits(ownerBalance, decimals)} ${symbol}`);
    let recipientBalance = await codeNinja.balanceOf(recipientAddress);
    console.log(`Balance of recipient (${recipientAddress}): ${ethers.utils.formatUnits(recipientBalance, decimals)} ${symbol}\n`);
}



main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });