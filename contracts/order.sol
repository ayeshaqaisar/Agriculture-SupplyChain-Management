// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Order{
    uint order_count;

    struct order{
        uint order_id;
        uint order_price;
        bool status;
        uint[] product_items;
        address farmer_address;
        address customer_address;
    }

    mapping(uint=>order) public order_map;
}