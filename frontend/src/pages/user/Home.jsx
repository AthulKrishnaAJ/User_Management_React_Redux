import React, { useEffect, useState } from 'react'
import Navbar from '../../components/user/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Toaster } from 'sonner'
import staticImg from '../../assets/images/userIcon.jpg'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { addProfileImage, updateDetails, getUserData } from '../../redux/userRdx/userThunk'




function Home() {
    const [image, setImage] = useState(null)
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector((store) => store.user.data)


 
    useEffect(() => {
        console.log('Userrrrrr: ', user._id)
        dispatch(getUserData({userId: user._id}))
        window.history.pushState(null, null, window.location.href);

        const handlePopState = (event) => {
            window.history.pushState(null, null, window.location.href);
          };

          window.addEventListener("popstate", handlePopState)

          return () => {
            window.removeEventListener("popstate", handlePopState);
          };
    },[]);


    const validationSchema = Yup.object({
        name: Yup.string()
                .trim()
                .required('Field is required'),
        email: Yup.string()
                .trim()
                .required('Field is required')
                .email('Invalid email'),

        mobile: Yup.string()
                .trim()
                .required('Field is required')
                .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")

    })

    const formik = useFormik({
        initialValues: {
            name: user?.name || "",
            email: user?.email || "",
            mobile: user?.mobile || ""
        },
        validationSchema,
        onSubmit: (values) => {
          dispatch(updateDetails({formData: values, userId: user._id}))
          setEdit(false)
        }
    })

    useEffect(() => {
        if(image){
            dispatch(addProfileImage({image, userId: user._id}))
        }
    })
   

  return (
    <>
      <div className='bg-gradient-to-t from-purple-400 to-gray-600 min-h-screen flex-col'>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <Toaster position='top-center' richColors/>
        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            <img
              src={user?.image 
                ? `http://localhost:4000/images/${user.image}` : staticImg}
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-md"
            />
       
              <button
                className="absolute bottom-1 right-1 text-gray-700 rounded-md p-1"
                onClick={() => document.getElementById("fileInput").click()}
              >
                < AddAPhotoIcon />
              </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-purple-500">Welcome Home!</h2>
        </div>

        { edit ? (
            <>
            <div className="flex justify-end">
                <button className='bg-purple-500 py-1 px-2 text-white rounded-md hover:bg-purple-600 font-semibold'
                onClick={() => setEdit(false)}
                >
               <KeyboardArrowLeftIcon/>Profile 
                </button>
            </div>
          <form onSubmit={formik.handleSubmit} className="space-y-2">
            {/* Name field */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-semibold">Name</label>
              {formik.touched.name && formik.errors.name
              ?( <p className='text-red-500 text-sm'>{formik.errors.name}</p>) : null}
              <input
                type="text"
                name="name"
                placeholder="Name"
                className='shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-semibold">Email</label>
              {formik.touched.email && formik.errors.email 
                ? (<p className='text-red-500 text-sm'>{formik.errors.email}</p> ): null }
              <input
                type="email"
                name="email"
                placeholder="Email"
                className='shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

              />

            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-semibold">Mobile</label>
              {formik.touched.mobile && formik.errors.mobile
              ? (<p className='text-red-500 text-sm'>{formik.errors.mobile}</p>) : null}
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                className='shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-500 text-white rounded-lg mt-4 hover:bg-purple-600 font-semibold"
            >
              Save Changes
            </button>
          </form>
          </>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-lg font-bold text-gray-600 underline">User Information</p>
            <p className="text-gray-700 font-semibold">Name: {user?.name || "Not provided"}</p>
            <p className="text-gray-700 font-semibold">Email: {user?.email || "Not provided"}</p>
            <p className="text-gray-700 font-semibold">Phone: {user?.mobile || "Not provided"}</p>
            <button
              className="mt-4 py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              onClick={() => setEdit(true)}
            >
              Edit Information
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Home
