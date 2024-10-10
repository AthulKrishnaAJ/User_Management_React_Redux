import React, { useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Toaster, toast } from 'sonner'


import { userLogin } from '../../redux/userRdx/userThunk'



const validationSchema = Yup.object({
    email: Yup.string()
            .trim()
            .required('field is required')
            .email('invalid email address'),
    password: Yup.string()
             .trim()   
             .required('field is required')
})

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((store) => store.user.data)
    
    useEffect(() => {
        if(userData){
            navigate('/')
            console.log('user data in the loginpage: ', userData)
        }
    }, [userData])
    

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (credentials) => {
            
            dispatch(userLogin(credentials));
        }
    })


  return (
    <>
   
    <div className='h-screen flex items-center justify-center bg-gradient-to-t from-purple-400 to-gray-600'>
        <Toaster position='top-center' richColors />
      <form
      onSubmit={formik.handleSubmit}
      className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4 bg-white'>
        <h2 className='text-3xl font-bold text-gray-600 text-center mt-4'>Login</h2>
        <div className='block text-gray-700 text-sm mb-2'>
            <label htmlFor="email" className='text-gray-500 font-bold'>Email</label><br />
            {formik.touched.email && formik.errors.email ? 
                <p className='text-red-400 text-xs'>{formik.errors.email}</p> : null}
            <input 
            className='shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="email" 
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            
            />
        </div>
        <div className='block text-gray-700 text-sm mb-2'>
            <label htmlFor="password" className='text-gray-500 font-bold'>Password</label><br />
            {formik.touched.password && formik.errors.password ? 
                <p className='text-red-400 text-xs'>{formik.errors.password}</p> : null}
            <input 
            className='shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="password" 
            name='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
            />
        </div>
        <button
        type='submit'
        className='bg-purple-500 hover:bg-purple-600 text-white font-bold mt-3 py-2 px-4 rounded w-80  focus:outline-none focus:shadow-outline'
        >
         Login
        </button>
        <p className='text-center text-gray-500 mt-4'>Doesn't have an account?
        <Link to={'/signup'}> <span className='font-bold cursor-pointer hover:text-purple-500 hover:underline'>
            Signup
            </span></Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default Login
