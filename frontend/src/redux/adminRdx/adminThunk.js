import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


export const adminLogin = createAsyncThunk('admin/adminLogin', async (credentials, {rejectWithValue}) => {
    try{
        console.log(credentials)
        const {data} = await axios.post('/api/admin/login', credentials)
        console.log('After admin login: ', data)
    
        const {status, token} = data
        
        if (status === 'Incorrect email') {
            toast.error('Incorrect email')
            return rejectWithValue('Incorrect email')
        } else if (status === 'Incorrect password') {
            toast.error('Incorrect password')
            return rejectWithValue('Incorrect password')
        } else if (status === 'Request failed please try again') {
            toast.error('Request failed please try again')
            return rejectWithValue('Request failed')
        } else {
            console.log('enter 1')
            return token
        }
    } catch(error) {
        return rejectWithValue(error.message)
    }
})  

export const blockUser = createAsyncThunk ('admin/blockUser', async ({userId, isBlocked}, {rejectWithValue}) => {
    
    const { data } = await axios.post('/api/admin/blockUnblock', {userId})

    if (data.modifiedCount === 1) {
        console.log('Action updated')
        let block = !isBlocked
        return {userId, block}
    } else {
        toast.error('Status updation failed')
        return rejectWithValue('Status updation failed')
    }
    
})




export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId, {rejectWithValue}) => {
    const { data } = await axios.post('/api/admin/delete', {userId})

    if (data.deletedCount === 1) {
        return userId
    } else if (data === 'Access_denied' || data === 'authentication_failed') {
        toast.error('Access denied login again')
        return rejectWithValue('Access denied')
    }   
})


export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
    const { data } = await axios.get('/api/admin/getUsers')
    return data
})


export const editUserDetails = createAsyncThunk('admin/editUser', async (values, {rejectWithValue}) => {
    try{
        const { data } = await axios.post('/api/admin/editUser', values)
        console.log('get response after updation: ', data)
        const {updateUser, status} = data

        if (status === 'failed') {
            toast.error('Request failed please try again')
            return rejectWithValue('Request failed')
        } else if(data === ("Access_denied" || "authentication_failed")) {
            toast.error('Access denied please login')
            return rejectWithValue('Access denied')
        } else {
            return values
        }
    }catch(error){
        console.log('Error occur in edit user thunk: ', error.message)
        return rejectWithValue(error.message)
    }
})