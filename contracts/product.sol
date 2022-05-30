// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Product{
    uint pid;
    struct product {
        uint product_id;
        string product_name;
        uint product_price;
        uint product_amount;
        string product_category;
        bool isAuthorised;
        address owner;
    }
    mapping(uint=>product) public product_map;
   
}