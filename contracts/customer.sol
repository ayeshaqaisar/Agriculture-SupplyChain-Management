// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./product.sol";
import "./farmer.sol";
//import "./payment.sol";
contract Customer is Farmer{
    uint cnt;
    uint amount;
    struct customer{
        uint customer_id;
        string customer_name;
        address customer_add;
        uint product_feedback;
        uint delivery_feedback;
        address farmer_address;
        string email;
        string location;
        string phone;
        uint[] products;
    }
    
    address[] customers;
    //address [farmer_address][key_id] public 
    mapping(address=>customer) public customer_map;
    //stores order price of basket of any customer
    mapping (address=>uint) public order_price_map;

    
    // constructor(){
    //     customer storage c= customer_map[msg.sender];
    //     c.customer_add=msg.sender;
    // }

    function setCustomerDetails(string memory _name,string memory _location,string memory _phone,string memory _email) public{
        customer storage c= customer_map[msg.sender];
        c.customer_add=msg.sender;
        if(c.customer_id==0)
        {   
            cnt++;
            c.customer_id=cnt;
        }
        c.phone=_phone; 
        c.customer_name=_name;
        c.location=_location;
        c.email=_email;
        // c.product_feedback=_product_feedback; to be set after delivery of the product
        // c.delivery_feedback=_delivery_feedback;
    }

        // function placeOrder(address _to) public
     function addProduct(uint _pid,address _farmer) public{
            customer storage c=customer_map[msg.sender];
            c.farmer_address=_farmer;
            c.products.push(_pid);
            order_price_map[msg.sender]+=product_map[_pid].product_price;
    }

    function viewProductsCustomer() public view returns (uint[] memory)
    {

        return customer_map[msg.sender].products;
    }

    function confirmOrder(address _farmerAddress) public
    {
        customer storage c=customer_map[msg.sender];
        processOrder(c.products,msg.sender,_farmerAddress);
        order storage o = order_map[order_count];
        o.order_price = order_price_map[msg.sender]; 
        amount=o.order_price;
    }
    
    // function confirmOrderReceived() public
    // {
    //     customer storage c=customer_map[msg.sender];
    //     farmer storage f=farmer_map[c.farmer_address];
    //     // payment_id++;
    //     // payment storage p=payment_map[payment_id];
    //     p.farmer_Paymentaddress=payable(c.farmer_address);
    //     p.customer_Paymentaddress=payable(msg.sender);
    //     p.delivery_Paymentaddress=payable(f.distributor_add);
    // }
    
    // function initiatePayment(address _to,uint _amount) public
    // {
    //   //  PaymentByCustomer(msg.sender,_amount,_to);
    // }
}