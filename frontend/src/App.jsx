import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'

// Components
import Signup from './components/user/Signup'
import Login from './components/user/Login'
import Home from './pages/user/Home'

// Auth
import UserAuth, { UserLoggedIn } from './auth/user/UserAuth'


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
          <UserLoggedIn>
            <Login/>
          </UserLoggedIn>
          }></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App




