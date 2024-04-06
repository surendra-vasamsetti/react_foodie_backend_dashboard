import React, {useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProduct from '../components/AllProduct'

const LandingPage = () => {
   
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken')
      if(loginToken){
        setShowLogOut(true)
      }
  }, [])

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName')
    if(firmName){
      setShowFirmTitle(false);
    }
  }, [])

  const logOutHandler = ()=>{
    confirm("Are You Sure To Logout?");
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName');
    setShowLogOut(false);
    setShowFirmTitle(true);
  }

  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)

  }

  const showWelcomeHandler = () => {
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(true)
    setShowAllProducts(false)
  }

  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  
  const showFirmHandler = () => {
    if(showLogOut){
      setShowFirm(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }else{
      alert("please login")
      setShowLogin(true);
    }

  }


  const showProductHandler = () => {
    if(showLogOut){
    setShowProduct(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    }else{
      alert("please Login!");
      setShowLogin(true);
    }
  }

  const showAllProductHandler = () => {
    if(showLogOut){
      setShowAllProducts(true)
    setShowProduct(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowWelcome(false)
    }else{
      alert("please Login!");
      setShowLogin(true);
    }
  }
  return (
   <>

   <section className="landingSection">

    <NavBar  showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler}/>
    <div className="collectionSection">
    <SideBar showFirmHandler = {showFirmHandler} showProductHandler ={showProductHandler} showAllProductHandler={showAllProductHandler} showFirmTitle={showFirmTitle}/>
   {showLogin && <Login showWelcomeHandler= {showWelcomeHandler} />}
    {showRegister && <Register showLoginHandler = {showLoginHandler}/>} 
    {showFirm && showLogOut && <AddFirm/>}
    {showProduct && showLogOut && <AddProduct/>}
    {showAllProducts && showLogOut && <AllProduct/>}
    {showWelcome && <Welcome/>}
    </div>
    
   </section>

   </>
  )
}

export default LandingPage
