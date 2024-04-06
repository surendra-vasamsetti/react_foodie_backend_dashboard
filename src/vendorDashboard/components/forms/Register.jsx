import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';


const Register = ({showLoginHandler}) => {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({username, email, password})
      })

      const data = await response.json()
      if(response.ok){
        console.log(data);
        setUserName("");
        setEmail("");
        setPassWord("");
        alert("vendor registered succesfully");
        showLoginHandler()
      }
      else {
        setError(data.error);
        alert("Registration Failed, Contact Admin")
      }
    } catch (error) {
      console.error("registration unsuccessful", error)
      alert('registration unsuccessfull')
    }
  }

  return (
   <div className="registerSection" >
    <form className='authForm' onSubmit={handleSubmit}>
      <h3>Vendor Registration</h3>
      <label >UserName</label>
      <input type="text" name= "username"  value={username} onChange={(e)=> setUserName(e.target.value)} placeholder='Enter Your Name' />
      <label >Email</label>
      <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email' />
      <label >Password</label>
      <input type="password" name="password" value={password} onChange={(e)=> setPassWord(e.target.value)} placeholder='Enter Your Password' />

      <div className="btnSubmit">
        <button type='submit'>Submit</button>
      </div>

    </form>
   </div>
  )
}

export default Register
