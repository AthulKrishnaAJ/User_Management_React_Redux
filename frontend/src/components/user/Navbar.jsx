import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import './Navbar.css'


import { Logout } from '../../redux/userRdx/userSlice'



function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

  const logout = () => {
        Swal.fire({
            title: 'Are you sure!',
            text: 'You wanna logout',
            icon:'question',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'No',
            customClass: {
                popup:'custom-swal-ask',
                confirmButton: 'bg-gray-600 text-white px-4 py-2 rounded-md',
                cancelButton: 'bg-purple-500 text-white px-4 py-2 rounded-md',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Logout!',
                    customClass: {
                        popup: 'custom-swal-confirm',
                        confirmButton: 'bg-gray-600 text-white px-4 py-2 rounded-md',
                    }
                }).then(() => {
                    dispatch(Logout())
                    navigate('/login')
                })
            }
        })
  }
  return (
    <nav className="p-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <h1>User Management System</h1>
                </div>
                <button
                    onClick={logout}
                    className="bg-white text-purple-500 font-bold py-2 px-4 rounded hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </nav>
    
  )
}

export default Navbar
