<<<<<<< HEAD
import React, { useState } from 'react'
import './DistributorRegister.css'
import 'react-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const DistributorRegister = () => {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        contactNumber: '',
        address: '',
        password: ''
    })
    
    const navigate = useNavigate()
      
    
    const changeName = (e) => {
        setFormData({
          ...formData,
          name: e.target.value
        })
        
    }
    const changeEmail = (e) => {
        setFormData({
          ...formData,
          email: e.target.value
        })
    }
    const changeContactNumber = (e) => {
        setFormData({
          ...formData,
          contactNumber: e.target.value
        })
    }
    const changeAddress = (e) => {
        setFormData({
          ...formData,
          address: e.target.value
        })
    }
    const changePassword = (e) => {
        setFormData({
          ...formData,
          password: e.target.value
        })
    }
    
    const submitForm = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/distributorRegister', formData)
          .then(response => {
            console.log(response)
            navigate('/distributorLogin')
            navigate(0)
            // console.log(formData);
          })
          .catch(err => {
              console.log(err);
        })
    }
  return (
    <div class='farmer-register'>
    <form id ="farmer-register-form">
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="name">ENTER YOUR NAME</p>
        <input type="text" onKeyUp={e => changeName(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="email">ENTER YOUR EMAIL</p>
        <input type="email"  onKeyUp={e => changeEmail(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="contactNumber">ENTER YOUR CONTACT NUMBER</p>
        <input type="text" onKeyUp={e => changeContactNumber(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt"  name="address">ENTER YOUR ADDERESS</p>
        <input type="text" onKeyUp={e => changeAddress(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="password">CREATE PASSWORD</p>
        <input type="password" onKeyUp={e => changePassword(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <button className='farmer-register-button' onClick={(e) => submitForm(e)} type="submit">REGISTER</button>
    </form>
   
  </div>
  )
}

=======
import React, { useState,useEffect } from 'react'
import './DistributorRegister.css'
import 'react-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../../utils/loadContract";
import Web3 from "web3";


let web3;
let distributor;
let provider;

const DistributorRegister = () => {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        contactNumber: '',
        address: '',
        password: ''
    })
    
    const [account, setAccount] = useState(null);
    const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
      console.log(accounts[0]);
    });
  };

  useEffect(() => {
    const loadProvider = async () => {
      provider = await detectEthereumProvider();
     
      if (provider) {
        setAccountListener(provider);
        provider.request({method: "eth_requestAccounts"});
      } else {
        console.error("Please install MetaMask!");
      }
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(provider);
    }
     const accounts = await web3.eth.getAccounts();
     setAccount(accounts[0]);
     distributor = await loadContract("Distributor", provider);
     console.log(distributor.address);
    };

    loadProvider();
  }, []);

  const setDetails = async()=>{
    //const provider=new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    var name=formData.name;
    var email=formData.email;
    var phone=formData.contactNumber;
    var location=formData.address;
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(location);
    console.log(distributor.address);
    console.log(account);
    distributor.setDetailsDistributor(name,phone,email,{from:account,gasLimit:3000000});
  }


    const navigate = useNavigate()
      
    
    const changeName = (e) => {
        setFormData({
          ...formData,
          name: e.target.value
        })
        
    }
    const changeEmail = (e) => {
        setFormData({
          ...formData,
          email: e.target.value
        })
    }
    const changeContactNumber = (e) => {
        setFormData({
          ...formData,
          contactNumber: e.target.value
        })
    }
    const changeAddress = (e) => {
        setFormData({
          ...formData,
          address: e.target.value
        })
    }
    const changePassword = (e) => {
        setFormData({
          ...formData,
          password: e.target.value
        })
    }
    
    const submitForm = (e) => {
        e.preventDefault()
        setDetails();
        axios.post('http://localhost:5000/distributorRegister', formData)
          .then(response => {
            console.log(response)
            navigate('/distributorProfile')
            navigate(0)
            // console.log(formData);
          })
          .catch(err => {
              console.log(err);
        })
    }
  return (
    <div class='farmer-register'>
    <form id ="farmer-register-form">
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="name">ENTER YOUR NAME</p>
        <input type="text" onKeyUp={e => changeName(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="email">ENTER YOUR EMAIL</p>
        <input type="email"  onKeyUp={e => changeEmail(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="contactNumber">ENTER YOUR CONTACT NUMBER</p>
        <input type="text" onKeyUp={e => changeContactNumber(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt"  name="address">ENTER YOUR ADDERESS</p>
        <input type="text" onKeyUp={e => changeAddress(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="password">CREATE PASSWORD</p>
        <input type="password" onKeyUp={e => changePassword(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <button className='farmer-register-button' onClick={(e) => submitForm(e)} type="submit">REGISTER</button>
    </form>
   
  </div>
  )
}

>>>>>>> shubham
export default DistributorRegister