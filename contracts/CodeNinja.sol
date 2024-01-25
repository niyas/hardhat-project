// contracts/CodeNinja.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CodeNinja is ERC20 {

    // Define the supply of CodeNinja: 1,000,0000 
    uint256 constant initialSupply = 10000000 * (10**18);

    // Constructor will be called on contract creation
    constructor() ERC20("CodeNinja", "CNJ") {
        _mint(msg.sender, initialSupply);
    }
}