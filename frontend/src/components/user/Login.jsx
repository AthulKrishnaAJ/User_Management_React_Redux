import React from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string()
            .trim()
            .required('Field is required')
            .email('Invalid email address'),
    password: Yup.string()
             .trim()   
             .required('Field is required')
})

function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            alert(values)
        }
    })


  return (
    <div className='h-screen flex items-center justify-center bg-purple-300'>
      <form
      onSubmit={formik.handleSubmit}
      className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4 bg-white'>
        <h2 className='text-3xl font-bold text-gray-600 text-center mt-4'>Login</h2>
        <div className='block text-gray-700 text-sm  mb-2'>
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
        <Link to={'/signup'}>
        <span className='font-bold cursor-pointer hover:text-purple-500 hover:underline'>
            Signup
        </span></Link>
        </p>
      </form>
    </div>
  )
}

export default Login
