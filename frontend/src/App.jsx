import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'

// user components
import Signup from './components/user/Signup'
import Login from './components/user/Login'
import Home from './pages/user/Home'

// admin components
import AdminLogin from './pages/admin/Login'
import AdminHome from './pages/admin/AdminHome'

// Auth
import UserAuth from './auth/user/UserAuth'
import AdminAuth from './auth/admin/AdminAuth'


import './index.css'
// Store
import store from './redux/store'




function App() { 
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={
          <UserAuth>
            <Home/>
            </UserAuth>
          }></Route>
        <Route path='/login' element={
            <Login/>  
          }></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/admin/login' element={<AdminLogin/>}></Route>
        <Route path='/admin/home' 
        element={
          <AdminAuth>
            <AdminHome/>
          </AdminAuth>
        }></Route>
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App




