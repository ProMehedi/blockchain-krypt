//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transactions {
  uint transactionCount;
  TransferStruct[] transactions;

  struct TransferStruct {
    address sender;
    address reciever;
    uint amount;
    string message;
    uint timestamp;
    string keyword;
  }

  event Transfer(address indexed sender, address indexed reciever, uint amount, string message, uint timestamp, string keyword);

  function addToBlockchain(address reciever, uint amount, string memory message, string memory keyword) public {
    transactionCount++;
    transactions.push(TransferStruct({
      sender: msg.sender,
      reciever: reciever,
      amount: amount,
      message: message,
      timestamp: block.timestamp,
      keyword: keyword
    }));

    emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint) {
    return transactionCount;
  }
}