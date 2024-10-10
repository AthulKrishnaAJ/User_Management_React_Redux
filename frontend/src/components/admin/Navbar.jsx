import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logout } from '../../redux/adminRdx/adminSlice'


function Navbar({onSearch}) {

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
                console.log('Enter the dispatch')
                dispatch(Logout())
                navigate('/admin/login')

            }
        })
    }

    const handleSearchChange = (e) => {
        onSearch(e.target.value)
    }

  return (
    <div>
        <nav className="p-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <h1 className='text-3xl text-gray-200'>Admin Dashboard</h1>
                </div>
                <div className='flex space-x-8'>
                    <input 
                    type="text" 
                    placeholder='Search here...'
                    className='px-4 py-2 rounded-md text-gray-700 text-sm outline-none'
                    onChange={handleSearchChange}

                    />
                <button
                    className="bg-white text-purple-500 font-bold py-2 px-4 rounded hover:bg-gray-100"
                    onClick={logout}
                >
                    Logout
                </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
