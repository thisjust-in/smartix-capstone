// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Event {
    
    address public host;
    uint256 public TicketId;
    mapping(uint256 => uint256) public TixPrice; //tixID: price
    mapping(uint256 => uint256) public TixQty;   //tixID: qty
    mapping(address => mapping(uint256 => uint256)) public TixHolder; //Address: {tixID: qty}

    constructor(address owner) {
        host = owner;
        TicketId = 0;
    }
    

    function mint(address caller, uint256 amount) public  {
        require(caller == host);
        TixQty[TicketId] = amount;
        TixHolder[host][TicketId] = amount;
        TicketId++;
    }
    
    function setPrice(address caller, uint256 _ticketId, uint256 _price) public  {
        require(caller == host);
        TixPrice[_ticketId] = _price*10**18 ;
    }
    
    function contractBalance (address caller) public view returns (uint256) {
        require(caller == host);
        return address(this).balance;
    }
    
    function buyTicket (address caller, uint256 _ticketId, uint256 _qty) public payable {
        TixHolder[host][_ticketId] -= _qty;
        TixHolder[caller][_ticketId] += _qty;
    }
    
}

contract CreateEvent {
    Event[] public contracts;
    uint256 public eventID;
    mapping(address => address payable) public eventLog; //{address(event) : address(host)}

    
    function getContractCount() public view returns (uint contractCount) {
        return contracts.length;
    }
    
    function newEvent() public {
        Event e = new Event(msg.sender);
        contracts.push(e);
        eventLog[address(e)] = payable(msg.sender);
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