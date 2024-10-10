import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner'

import { blockUser, deleteUser, fetchUsers, editUserDetails} from '../../redux/adminRdx/adminThunk'


const editValidationSchema = Yup.object({
    name: Yup.string()
            .trim()
            .required('field is required')
            .matches(/^[a-zA-Z\s]+$/,'enter a valid name'),
    email: Yup.string()
            .trim()
            .required('field is required')
            .email('invalid email address'),
    mobile: Yup.string()
            .trim()
            .required('field is required')
            .matches( /^[0-9]+$/, 'invalid mobile number')
            .matches(/^[0-9]{10}$/, 'mobile number must be 10 digits')
})



function Home({searchValue}) {
    const userData = useSelector((store) => store.admin.usersData)
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const [editUser, setEditUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
 
    

    useEffect(() => {
        if (userData) {
            setData(userData)
        }
    }, [userData])


    useEffect(() => {
        dispatch(fetchUsers())

        window.history.pushState(null, null, window.location.href);
    
        const handlePopState = () => {
          window.history.pushState(null, null, window.location.href);
        };
    
        window.addEventListener("popstate", handlePopState);
    
        return () => {
          window.removeEventListener("popstate", handlePopState);
        };
    }, [])


    const user = data.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );



    const blockUnblock = (userId, isBlocked) => {
        Swal.fire({
            title: 'Are you sure',
            text: `You wanna ${isBlocked ? "unblock": "block"} this user ?`,
            icon:'question',
            showCancelButton: true,
            confirmButtonText: `${isBlocked ? "Unblock" : "Block"}`,
            cancelButtonText: 'No',
            customClass: {
                popup:'custom-swal-ask',
                confirmButton: 'bg-gray-600 text-white px-4 py-2 rounded-md',
                cancelButton: 'bg-purple-500 text-white px-4 py-2 rounded-md',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(blockUser({userId, isBlocked}))
            }
        })
    }


    
    const deleteAUser = (userId) => {
        Swal.fire({
            title: 'Are you sure',
            text: `You wanna delete this user ?`,
            icon:'question',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'No',
            customClass: {
                popup:'custom-swal-ask',
                confirmButton: 'bg-gray-600 text-white px-4 py-2 rounded-md',
                cancelButton: 'bg-purple-500 text-white px-4 py-2 rounded-md',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(userId))
            }
        })
    }


    const openEditModal = (user) => {
        setEditUser(user)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditUser(null)
    }


    const formik = useFormik({
        initialValues: {
            userId: editUser?._id || '',
            name: editUser?.name || '',
            email: editUser?.email || '',
            mobile: editUser?.mobile || ''
        },
        enableReinitialize: true,
        validationSchema: editValidationSchema,
        onSubmit: async (values) => {
            try{
              const result = await dispatch(editUserDetails(values)).unwrap()
              if(result){
                toast.success('User details updated');
                closeModal()
              }
            } catch(error) {
                toast.error('Error updating user details');
            }
        }
    })




    return (
    <div className="relative overflow-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-600">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3"> 
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mobile
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                          Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Block/Unblock     
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete    
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map((user) => (
                        <tr key={user._id} className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.name}
                        </th>
                        <td className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                            {user.email}
                        </td>
                        <td className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                            {user.mobile}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${user.isBlocked ? 'text-red-500': 'text-green-500'} `}>
                            {user.isBlocked ? "Blocked" : "Unblocked"}
                        </td>
                        <td className="px-6 py-4 space-x-3">
                            <button
                            className='bg-gray-100 px-5 py-0.5 rounded-sm font-semibold text-purple-600 hover:text-gray-100 hover:bg-purple-500'
                            onClick={() => openEditModal(user)}
                            >
                                Edit
                            </button>
                        </td>
                        <td className="px-6 py-4 space-x-3">
                            <button
                            className='bg-gray-100 px-4 py-0.5 rounded-sm font-semibold text-purple-600 hover:text-gray-100 hover:bg-purple-500'
                            onClick={() => blockUnblock(user._id, user.isBlocked)}
                            >
                                {user.isBlocked ? 'Unblock': 'Block'}
                            </button>
                        </td>
                        
                        <td className="px-6 py-4 space-x-3 ">
                            <button
                            className='bg-gray-100 px-3 py-0.5 rounded-sm font-semibold text-purple-600 hover:text-gray-100 hover:bg-purple-500'
                            onClick={() => deleteAUser(user._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))
                }

            </tbody>
        </table>


        {editUser && isModalOpen && (
            <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth='sm'>
                <DialogTitle style={{textAlign: 'center', fontSize: '2rem', color: 'gray'}}>Edit User</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                <DialogContent >
                    {formik.touched.name && formik.errors.name
                    ? <p className='text-red-500 text-sm'>{formik.errors.name}</p> : null}
                    <TextField
                    margin='dense'
                    label='name'
                    name='name'
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    
                    />
                    {formik.touched.email && formik.errors.email
                    ? <p className='text-red-500 text-sm'>{formik.errors.email}</p> : null}
                    <TextField
                    margin='dense'
                    label='email'
                    name='email'
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}

                    />
                    {formik.touched.mobile && formik.errors.mobile
                    ? <p className='text-red-500 text-sm'>{formik.errors.mobile}</p> : null}
                    <TextField
                    margin='dense'
                    label='mobile'
                    name='mobile'
                    fullWidth
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}

                    />
                </DialogContent>
          
                <DialogActions>
                    <div className="bg-gray-500  px-2 py-0 rounded-sm hover:bg-gray-600 transition-all">
                        <Button 
                        onClick={closeModal}  
                        style={{ color: "white" }}  // Use inline style for text color
                        >
                         Cancel
                        </Button>
                    </div>
                    <div className="bg-purple-500  px-2 py-0 ml-2 rounded-sm hover:bg-purple-600 transition-all">
                        <Button 
                        type="submit" 
                        style={{ color: "white" }}
                        >
                        Save
                        </Button>
                        </div>
                    </DialogActions>
                    </form>
            </Dialog>
        )}

    </div>

    )
}

export default Home
