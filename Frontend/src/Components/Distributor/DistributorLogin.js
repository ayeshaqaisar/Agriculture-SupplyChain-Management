import React, { useState } from 'react'
import './DistributorRegister.css'
import 'react-dom';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const DistributorLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
      
    const navigate = useNavigate()

    const changeEmail = (e) => {
        setFormData({
          ...formData,
          email: e.target.value
        })
    }
    const changePassword = (e) => {
      console.log(e.target.value)
        setFormData({
          ...formData,
          password: e.target.value
        })
    }
      
    const submitForm = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/DistributorLogin', formData, {withCredentials: true})
          .then(response => {
            console.log(response)
            navigate('/distributorProfile')
            navigate(0)
            console.log(formData);
          })
          .catch(err => {
              console.log(err);
          })
    }
  return (
    <div class='farmer-register'>
    <form id ="farmer-register-form" action="/DistributorLogin" method="POST">
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt" name="name" >ENTER YOUR EMAIL</p>
        <input type="name"  onKeyUp={e => changeEmail(e)} class="farmer-register-input" name="email"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <label className="farmer-register-label">
        <p class="farmer-register-label-txt">ENTER YOUR PASSWORD</p>
        <input type="password"  onKeyUp={e=> changePassword(e)} class="farmer-register-input" name="password"/>
        <div class="farmer-register-line-box">
          <div class="farmer-register-line"></div>
        </div>
      </label>
      <br/>
      <button className='farmer-register-button' onClick={(e) => submitForm(e)} type="submit">LOGIN</button>
    </form>
   
  </div>
  )
}

export default DistributorLogin