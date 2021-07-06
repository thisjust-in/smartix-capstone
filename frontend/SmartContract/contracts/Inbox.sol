 
pragma solidity >=0.4.16 <0.9.0;

contract Indox {
    string message;

    function set(string memory newMessage) public {
        message = newMessage;
    }

    function get() public view returns (string memory) {
        return message;
    }
}