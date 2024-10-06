import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';


 export const signupThunk = async (userData) => {
    const {name, email, mobile, password} = userData
    const trimData = {
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        password: password.trim()
    }

    const {data} = await axios.post('/api/signup', trimData)
    console.log(data.status)

    if(data.status === 'emailExists' || data.status === 'internalServerError'){
        if(data.status === 'emailExists'){
            toast.warning('Email already exist')
        } else {
            toast.error('Request failed please try again')
        }
    } else if(data.status === 'success'){
        return true
    }
   

}

