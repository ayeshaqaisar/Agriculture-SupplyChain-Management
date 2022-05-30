import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import FarmerLogin from './Components/Farmer/FarmerLogin.js';
import FarmerRegister from './Components/Farmer/FarmerRegister.js';
import FarmerProfile from './Components/Farmer/FarmerProfile/FarmerProfile.js';
import CreateProduct from './Components/Farmer/CreateProduct/CreateProduct.js';

import CustomerLogin from './Components/Customer/CustomerLogin.js';
import CustomerRegister from './Components/Customer/CustomerRegister.js';
import CustomerProfile from './Components/Customer/CustomerProfile/CustomerProfile.js';
import DistributorLogin from './Components/Distributor/DistributorLogin.js';
import DistributorRegister from './Components/Distributor/DistributorRegister.js';
import DistributorProfile from './Components/Distributor/DistributorProfile/DistributorProfile.js';
import jwt_decode from "jwt-decode";
import * as bst from "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import { useCookies } from "react-cookie";


function check_cookie_name(name)  // "token"
{
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return (match[2]);
  }
  else{
      return ''
  }
}

function App() {
  var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXllc2hhIiwiZW1haWwiOiJBc2h1QGdtYWlsLmNvbSIsImNvbnRhY3ROdW1iZXIiOiI2NzU4OTA1NjciLCJpYXQiOjE2NTAwMzU2NjZ9.Bu7BjJfKLfhHLaUe8kl77qle00Lp3bxrUqUlFZqrsnw";
  var decoded= jwt_decode(token);

  console.log(decoded);
  return (
    <Router> 
      <div className="App">
      
        <Navbar/> 
        <br/>
        <Routes>
          <Route exact path="/" element={<Home/>} />

          <Route  path="/farmerLogin" element={<FarmerLogin/>} />
          <Route  path="/farmerRegister" element={<FarmerRegister/>} />
          <Route  path="/farmerProfile" element={<FarmerProfile/>} />
          <Route  path="/farmerCreateProduct" element={<CreateProduct/>} />
          
          <Route  path="/customerLogin" element={<CustomerLogin/>} />
          <Route  path="/customerRegister" element={<CustomerRegister/>} />
          <Route  path="/customerProfile" element={<CustomerProfile/>} />

          <Route  path="/distributorLogin" element={<DistributorLogin/>} />
          <Route  path="/distributorRegister" element={<DistributorRegister/>} />
          <Route  path="/distributorProfile" element={<DistributorProfile/>} />


         </Routes>      
       </div>
    </Router>
  );
}

export default App;

