// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Adoption {

  // The pet being adopted
  address public owner;
  address[16] public adopters;

  constructor() public {
    // Initialize the public variable
    owner = msg.sender;
  }

  // The pet being adopted
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  // the pet id is correct
  modifier petIdChecker(uint petIdNumber) {
    require(petIdNumber>=0 && petIdNumber<=15);
    _;
  }

  // get pet ids from the array
  function getAdopters() public view returns (address[16] memory) {
    return adopters;
  }

  function adopt(uint petId) public petIdChecker(petId) returns(uint) {
    adopters[petId] = owner;
    return petId;
  }
}
