import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {

  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
      })

      const data = await response.json();
      if(response.ok){
        setEmail("");
        setPassword("");
        alert("login successfull");
        localStorage.setItem('loginToken', data.token);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log("checking for vendorId", vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log("chaecking for firm id:", vendorFirmId);
        localStorage.setItem('firmId', vendorFirmId)
        localStorage.setItem('firmName',vendorFirmName )
        window.location.reload()
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="loginSection">
     
      <form className='authForm' onSubmit={loginHandler} >
      <h3>Vendor Login</h3>
      <label >E-mail</label>
      <input type="email" name= 'email' value={email}  onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email' /><br />
      <label >Password</label>
      <input type="password"  name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' /><br />
      <div className="btnSubmit">
        <button type='submit'>Submit</button>
      </div>
      </form>
    </div>
  )
}

export default Login
