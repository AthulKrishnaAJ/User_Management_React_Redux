import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Toaster } from 'sonner'



import { adminLogin } from "../../redux/adminRdx/adminThunk"

const validationSchema = Yup.object().shape({
    email: Yup.string()
            .trim()
            .required('field is required')
            .email('invalid email address'),
    password: Yup.string()
                .trim()
                .required('field is required')
})


function AdminLogin () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((store) => store.admin.adminToken)

    useEffect(() => {
        if (token) {
            navigate('/admin/home')
        }
    }, [token])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (credentials) => {
            dispatch(adminLogin(credentials))
        }
    })


    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-t from-purple-400 to-gray-600">
     
            <form 
            onSubmit={formik.handleSubmit}
            className="shadow-md rounded-md px-8 pb-8 pt-6 mb-4 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-600 mb-4">Login</h2>
                <div className="block text-gray-700 text-sm mb-3">
                    <label htmlFor="email" className="font-bold">Email</label><br />
                    {formik.touched.email && formik.errors.email 
                    ? <p className="text-red-400 text-sm">{formik.errors.email}</p> : null }
                    <input 
                    className={`shadow-md appearance-none border rounded w-80 
                        py-2 px-3 text-gray-700 leading-tight focus:outline-none 
                        ${formik.touched.email && formik.errors.email && 'border-red-300' }`}
                    type="email" 
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                    />
                </div>

                <div className="block text-gray-700 text-sm mb-3">
                    <label htmlFor="password" className="font-bold">Password</label><br />
                    {formik.touched.password && formik.errors.password 
                    ? <p className="text-red-400 text-sm">{formik.errors.password}</p> : null}
                    <input 
                    className={`shadow-md appearance-none border rounded w-80 
                        py-2 px-3 text-gray-700 leading-tight focus:outline-none 
                        ${formik.touched.password && formik.errors.password && 'border-red-300'}`}
                    type="password" 
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                    />
                </div>

                <button
                type="submit"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold mt-3 py-2 px-4 rounded w-80 focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>

            </form>
        </div>
    )
}

export default AdminLogin