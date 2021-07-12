pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Event is ERC1155 {
    address public host;
    uint256 public TicketId;
    mapping(uint256 => uint256) public price;
    

    constructor()
        ERC1155(
            "https://raw.githubusercontent.com/akcgjc007/erc1155-Mushroom/main/meta/%7Bid%7D.json"
        )
    {
        host = msg.sender;
        TicketId = 0;
    }
    
    modifier onlyHost() {
        require(msg.sender == host);
        _;
    } 

    function mint( uint256 amount) public onlyHost {
        _mint(host, TicketId, amount, "");
        TicketId++;
    }
    
    function setPrice(uint256 _ticketId, uint256 _price) public onlyHost {
        price[_ticketId] = _price;
    }
    
    function contractBalance () public view onlyHost returns (uint256) {
        return address(this).balance;
    }
    
    function buyTicket (uint256 _ticketId, address _from, address _to, uint256 , uint256 _qty) public payable {
        require(_to.balance > price[_ticketId]);
        
 
    }
    
}