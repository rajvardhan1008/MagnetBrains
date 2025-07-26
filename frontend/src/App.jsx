import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import MainPage from './components/MainPage'
import SuccessPage from './components/SuccessPage'
import CancelPage from './components/CancelPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>} ></Route>
      <Route path='/signup' element={<Signup></Signup>} ></Route>
      <Route path='/login' element={<Login></Login>} ></Route>
      <Route path='/mainpage' element={<MainPage></MainPage>} ></Route>
      <Route path='/success' element={<SuccessPage></SuccessPage>} ></Route>
      <Route path='/cancel' element={<CancelPage></CancelPage>} ></Route>
    </Routes>
  )
}

export default App