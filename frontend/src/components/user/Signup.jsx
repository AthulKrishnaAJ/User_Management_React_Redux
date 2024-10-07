import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Toaster, toast} from 'sonner'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { signupThunk } from "../../redux/userRdx/userThunk";


const validationSchema = Yup.object({
    name: Yup.string()
            .trim()
            .required('Field is required')
            .matches(/^[a-zA-Z\s]+$/, 'Enter a valid name'),
    email: Yup.string()
            .trim()
            .required('Field is required')
            .email('Invalid email address'),
    mobile: Yup.string()
            .trim()
            .required('Field is required')
            .matches( /^[0-9]+$/, 'Invalid mobile number')
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
    password: Yup.string()
             .trim()
             .required('Field is required')
             .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
                    .trim()
                    .required('Field is required')
                    .oneOf([Yup.ref('password'), null], 'Password must match')
});

const Signup = () => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const response = await signupThunk(values)
            if(response){
                toast.success('Successfully signed')
                setTimeout(() => {
                    navigate('/login')
                }, 2500)
            }
        }
    })
    
    return (
       
        <div className="h-screen flex items-center justify-center bg-gradient-to-t from-purple-400 to-gray-600">
        <Toaster position="top-center" richColors/>
            <form onSubmit={formik.handleSubmit}
            className="shadow-md rounded-md px-8 pt-6 pb-8 mb-4 bg-white">
                <h2 className="text-3xl font-bold text-gray-600 text-center mt-4">Signup</h2>
                <div className="block text-gray-700 text-sm mb-2">
                    <label htmlFor="name" className="text-gray-500 font-bold">Name</label><br />
                    {formik.touched.name && formik.errors.name ? <p className="text-red-400 text-xs">{formik.errors.name}</p> : null}
                    <input
                        className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        name="name"         
                        id="name" 
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                </div>
                <div className="block text-gray-700 text-sm mb-2">
                    <label htmlFor="email" className="text-gray-500 font-bold">Email</label><br />
                    {formik.touched.email && formik.errors.email ? <p className="text-red-400 text-xs">{formik.errors.email}</p> : null}
                    <input 
                        className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email" 
                        id="email" 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                </div>
                <div className="block text-gray-700 text-sm mb-2">
                    <label htmlFor="phone" className="text-gray-500 font-bold">Mobile</label><br />
                    {formik.touched.mobile && formik.errors.mobile ? <p className="text-red-400 text-xs">{formik.errors.mobile}</p> : null}
                    <input 
                        className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="mobile" 
                        id="mobile" 
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        

                    />
                </div>
                <div className="block text-gray-700 text-sm mb-2">
                    <label htmlFor="password" className="text-gray-500 font-bold">Password</label><br />
                    {formik.touched.password && formik.errors.password ? <p className="text-red-400 text-xs">{formik.errors.password}</p> : null}
                    <input 
                        className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password" 
                        id="password" 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}


                    />
                </div>
                <div className="block text-gray-700 text-sm mb-2">
                    <label htmlFor="confirmPassword" className="text-gray-500 font-bold">Confirm Password</label><br />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-red-400 text-xs">{formik.errors.confirmPassword}</p> : null}
                    <input 
                        className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="confirmPassword" 
                        id="confirmPassword" 
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}


                    />
                </div>
                <button 
                type="submit" 
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold mt-3 py-2 px-4 rounded w-80  focus:outline-none focus:shadow-outline"
                >
                Signup
                </button>
                <p className="text-gray-500 text-center mt-3">Have already an account? 
                  <Link to={'/login'}> <span className="font-bold cursor-pointer hover:text-purple-500 hover:underline">
                    Login now
                    </span></Link> 
                    </p>
            </form>
        </div>
        
    )
}

export default Signup