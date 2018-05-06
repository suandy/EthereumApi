pragma solidity ^0.4.17;

contract EthereumApi {
    address public sender;

    function EthereumApi () public {
        sender = msg.sender;
    }
}