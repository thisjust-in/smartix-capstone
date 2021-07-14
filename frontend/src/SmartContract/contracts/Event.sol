// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Event {
    
    address public host;
    uint256 public TicketId;
    mapping(uint256 => uint256) public TixPrice; //tixID: price
    mapping(uint256 => uint256) public TixQty;   //tixID: qty
    mapping(address => mapping(uint256 => uint256)) public TixHolder; //Address: {tixID: qty}

    constructor(address owner) public {
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