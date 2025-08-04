// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract VulnerableContract {
    mapping(address => uint256) public balances;
    address[] public users;
    uint256 public totalDeposits;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        totalDeposits += msg.value;
        users.push(msg.sender);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount);
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent);
        balances[msg.sender] -= amount;
    }

    function batchSend(address[] memory recipients, uint256 amount) public {
        for (uint i = 0; i < recipients.length; i++) {
            recipients[i].call{value: amount}("");
        }
    }

    function updateUser(address user, uint256 index) public {
        users[index] = user;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function clearStorage() public {
        for (uint i = 0; i < users.length; i++) {
            delete users[i];
        }
    }

    function manipulate() public {
        uint256 i = 1;
        i -= 2;
        totalDeposits += i;
    }

    function getUser(uint index) public view returns (address) {
        return users[index];
    }

    function donate(address payable target) public payable {
        target.transfer(msg.value);
    }

    function reset() public {
        selfdestruct(msg.sender);
    }
}
