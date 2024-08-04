import React, { useState }  from 'react'
import Navbar from './components/Navbar'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Verify from './pages/Verify'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup'
import Myorders from './pages/Myorders'
import Recipes from './components/Recipes'


const App = () => {

  const  [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<PlaceOrder/>} />
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<Myorders/>}/>
      <Route path='/Recipes' element={<Recipes/>}/>
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
