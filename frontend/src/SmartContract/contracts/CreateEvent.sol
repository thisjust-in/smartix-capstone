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
    
    function getHost () external view returns (address) {
        return host;
    }
    
    function getTixPrice (uint256 _ticketId) external view returns (uint256) {
       return (TixPrice[_ticketId]);
    }
    
    function getTixQty (address _host, uint256 _ticketId) external view returns (uint256) {
        return TixHolder[_host][_ticketId];
    }
    
    function setPrice(address caller, uint256 _ticketId, uint256 _price) public  {
        require(caller == host);
        TixPrice[_ticketId] = _price*10**18 ;
    }
    
    function buyTicket (address caller, uint256 _ticketId, uint256 _qty) public payable {
        TixHolder[host][_ticketId] -= _qty;
        TixHolder[caller][_ticketId] += _qty;
    }
    
    function tixTypeCount() public view returns (uint) {
        return TicketId;
    }
    
}

contract CreateEvent {
    Event[] public contracts;
    uint256 public eventID;
    mapping(address => address payable) public eventLog; //{address(event) : address(host)}
    event GetAddress (address _eventaddress);

    
    function getContractCount() public view returns (uint contractCount) {
        return contracts.length;
    }
    
    function newEvent() public {
        Event e = new Event(msg.sender);
        contracts.push(e);
        eventLog[address(e)] = payable(msg.sender);
        eventID++;
        emit GetAddress (address(e));
    }
      
    function Mint(address _eventaddress, uint256 _amount) public {
        Event(_eventaddress).mint(msg.sender, _amount);
    }
    
    function GetTixTypeCount(address _eventaddress) public view returns (uint) {
        return Event(_eventaddress).tixTypeCount();
    }

    
    function QtyPerTixType(address _eventaddress, uint256 _tixID) public view returns (uint256) {
        return Event(_eventaddress).TixQty(_tixID);
    }
        
    function TixQtyPerUser(address _eventaddress, address _owner, uint256 _tixID) public view returns (uint256) {
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
        require(_qty <= TixQtyPerUser(_eventaddress, eventLog[_eventaddress], _tixID));
        eventLog[_eventaddress].transfer(TixPrice(_eventaddress, _tixID)*_qty);
        Event(_eventaddress).buyTicket(msg.sender, _tixID, _qty);
    }

}