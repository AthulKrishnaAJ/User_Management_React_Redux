import React, { useState } from 'react'
import Home from '../../components/admin/Home'
import Navbar from '../../components/admin/Navbar'
import { Toaster } from 'sonner'

function AdminHome() {
  const [searchQuery, setSearchQuery] = useState('')

  const onSearch = (value) => {
    setSearchQuery(value)
  }
  
  return (
    <div className=' h-screen justify-center items-center bg-gradient-to-t from-purple-400 to-gray-600'>
      <Toaster position='top-center' richColors/>
      <Navbar onSearch={onSearch} />
      <Home searchValue={searchQuery}/>
    </div>
  )
}

export default AdminHome
