// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.8;

import "./Event.sol";

contract CreateEvent {
    address[] public contracts;
    uint256 public eventID;
    mapping(address => address) public eventLog; //id: {address(event) : address(host)}

    
    function getContractCount() public view returns (uint contractCount) {
        return contracts.length;
    }
    
    function newEvent() public {
        Event e = new Event(msg.sender);
        contracts.push(e);
        eventLog[address(e)] = msg.sender;
        eventID++;
    }
      
    function Mint(address _eventaddress, uint256 _amount) public {
        Event(_eventaddress).mint(msg.sender, _amount);
    }
        
    function TixQty(address _eventaddress, address _owner, uint256 _tixID) public view returns (uint256) {
        return Event(_eventaddress).TixHolder(_owner, _tixID);
    }
    
    function setPrice(address _eventaddress,uint256 _tixID,uint256 _price) public{
        Event(_eventaddress).setPrice(msg.sender, _tixID, _price);
    }
    
    function TixPrice(address _eventaddress,uint256 _tixID) public view returns(uint256){
        return Event(_eventaddress).TixPrice(_tixID);
    }
    
    function buyTicket(address _eventaddress,uint256 _tixID, uint256 _qty) public payable {
        require(msg.sender.balance >= TixPrice(_eventaddress, _tixID));
        require(_qty <= TixQty(_eventaddress, eventLog[_eventaddress], _tixID));
        eventLog[_eventaddress].transfer(TixPrice(_eventaddress, _tixID)*_qty);
        Event(_eventaddress).buyTicket(msg.sender, _tixID, _qty);
    }   
}