import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signup from './components/user/Signup'
import Login from './components/user/Login'
import './index.css'



function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App




