import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'sonner';


export const signupThunk = async (userData) => {
    const { name, email, mobile, password } = userData
    const trimData = {
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        password: password.trim()
    }

    const { data } = await axios.post('/api/signup', trimData)
    console.log(data.status)

    if (data.status === 'emailExists' || data.status === 'internalServerError') {
        if (data.status === 'emailExists') {
            toast.warning('Email already exist')
        } else {
            toast.error('Request failed please try again')
        }
    } else if (data.status === 'success') {
        return true
    }


};

export const userLogin = createAsyncThunk('user/userLogin', async (credentials, thunkApi) => {
    try {
        console.log('Enter login thunk')
        const {data} = await axios.post('/api/login', credentials)
        const {status} = data

        if (status === 'User not found') {
            toast.error('User not found')
            return isRejectedWithValue('user not found')

        } else if (status === "Password doesn't match") {
            toast.error("Password doesn't match")
            return isRejectedWithValue("password doesn't match")

        } else if (status === 'User is blocked') {
            toast.error('User is blocked')
            return isRejectedWithValue('user is blocked')
        } else {
            toast.success('Successfully login')
            return data
        }

    } catch (error) {
        console.log('Error in login thunk: ', error.message)
        return thunkApi.rejectWithValue({error: error.message})
    }
})

export const addProfileImage = createAsyncThunk('user/addProfileImage', async ({image, userId}) => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('userId', userId)

    const { data } = await axios.post('/api/addImage', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return data

})


export const updateDetails = createAsyncThunk('user/updateDetails', async ({formData, userId}) => {
    console.log(formData)
    const { data } = await axios.post('/api/updateProfile', {formData, userId});
    console.log('Response from backend after updating the user: ', data)
    if (data.status === 'success') {
        toast.success('Profile updated')
    } else {
        toast.error('Request failed please try again')
    }
    return data
})

export const getUserData = createAsyncThunk('user/getUserData', async ({userId}) => {
    console.log('User iddddddd: ', userId)
    const { data } = await axios.post('/api/getData', {userId})
    return data
})

