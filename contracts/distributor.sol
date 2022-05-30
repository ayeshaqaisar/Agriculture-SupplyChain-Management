// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./order.sol";
contract Distributor is Order{
    uint distributor_count;
    struct distributor{
        uint distributor_id;
        string distributor_name;
        address distributor_add;
        uint distributor_rating;
        string distributor_phone;
        string distributor_email;
        order[] orders;
    }
    mapping(address=>distributor) public distributor_map;

    constructor(){
        distributor storage d = distributor_map[msg.sender];
        d.distributor_add=msg.sender;
    }
    function setDetailsDistributor(string memory _name,string memory _phone,string memory _email) public{
        distributor storage d = distributor_map[msg.sender];
        if(d.distributor_id==0)
        {
        distributor_count++;
        d.distributor_id=distributor_count;
        }
        d.distributor_name=_name;
        d.distributor_phone=_phone;
        d.distributor_email=_email;  
    }
    

}