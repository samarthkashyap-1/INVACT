import React from 'react'
import Navbar from './component/Navbar'

import LandingTheme from './pages/LandingTheme'

import {Route, Routes} from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Register from './component/Register'

import MyList from './component/MyList'
import AddMovieForm from './component/AddMovieForm'
import UpdateMovie from './component/UpdateMovie'

const App = () => {
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingTheme/>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/watchlist" element={<MyList/>}/>
          <Route path="/addmovie" element={<AddMovieForm/>}/>
          <Route path="/updatemovie/:id" element={<UpdateMovie/>}/>
        </Route>

        

      </Routes>
        
    </div>
  )
}

export default App