import React, { useState,useEffect } from 'react'
import './FarmerRegister.css'
import 'react-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../../utils/loadContract";
import Web3 from "web3";

let web3;
let farmer;
let provider;

const FarmerRegister = () => {
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
     farmer = await loadContract("Farmer", provider);
     console.log(farmer.address);
    };

    loadProvider();
  }, []);
// const farmerContract = async()=>{
//   //const provider=new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  // const provider=await detectEthereumProvider();
  //     if (provider) {
  //       setAccountListener(provider);
  //       provider.request({method: "eth_requestAccounts"});
  //     } else {
  //       console.error("Please install MetaMask!");
  //     }
//   if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // set the provider you want from Web3.providers
//     web3 = new Web3(provider);
// }
//  farmer = await loadContract("Farmer", provider);
//  console.log(farmer.address);
// }

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
  console.log(farmer.address);
  // await web3.eth.getAccounts().then((accounts)=>{
  //   var acc=accounts[0];
  //   console.log(acc);
     console.log(account);
     farmer.setFarmerDetails(name,location,phone,email,{from:account,gasLimit:3000000});
// }).then((tx)=>{
//     console.log(tx);
// }).catch((tx)=>{
//     console.log(tx);
// });
}

  const navigate = useNavigate()
  

  const changeName = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    })
    //console.log(formData)
  }
  const changeEmail = (e) => {
    setFormData({
      ...formData,
      email: e.target.value
    })
    //console.log(formData)
  }
  const changeContactNumber = (e) => {
    setFormData({
      ...formData,
      contactNumber: e.target.value
    })
    //console.log(formData)
  }
  const changeAddress = (e) => {
    setFormData({
      ...formData,
      address: e.target.value
    })
    //console.log(formData)
  }
  const changePassword = (e) => {
    setFormData({
      ...formData,
      password: e.target.value
    })
    //console.log(formData)
  }

  const submitForm = (e) => {
    e.preventDefault()
    setDetails();
    axios.post('http://localhost:5000/farmerRegister', formData, {withCredentials: true})
      .then(response => {
        console.log(response)
        navigate('/farmerLogin')
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
        <input type="text" onKeyDown={e => changeName(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="email">ENTER YOUR EMAIL</p>
        <input type="email"  onKeyDown={e => changeEmail(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="contactNumber">ENTER YOUR CONTACT NUMBER</p>
        <input type="text" onKeyDown={e => changeContactNumber(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt"  name="address">ENTER YOUR ADDERESS</p>
        <input type="text" onKeyDown={e => changeAddress(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box ">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="password">CREATE PASSWORD</p>
        <input type="password" onKeyDown={e => changePassword(e)} class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      {/* <label className="farmer-register-label">
        <p class="farmer-register-label-txt">CONFIRM PASSWORD</p>
        <input type="password" class="farmer-register-input"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/> */}
      <button className='farmer-register-button' onClick={(e) => submitForm(e)} type="submit">REGISTER</button>
    </form>
   
  </div>
  )
}

export default FarmerRegister