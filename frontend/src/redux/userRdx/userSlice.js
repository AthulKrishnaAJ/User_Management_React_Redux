import { createSlice } from "@reduxjs/toolkit";
import { userLogin, addProfileImage, updateDetails, getUserData } from "./userThunk";

// localStorage.removeItem('data')
// localStorage.removeItem('token')

const data = localStorage.getItem('data')
            ? JSON.parse(localStorage.getItem('data')) 
            : null

const token = localStorage.getItem('token')
             ? localStorage.getItem('token')
            : null


const userSlice = createSlice ({
    name: 'user',
    initialState: {
        data: data,
        token: token
    },
    reducers: {
        Logout: (state) => {
            localStorage.removeItem('data')
            localStorage.removeItem('token')
            state.data = null
            state.token = null
            console.log('Logout reducer state data: ', state.data)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            console.log('Action in the user slice: ',action.payload)
            const {userData, token} = action.payload
            localStorage.setItem('data', JSON.stringify(userData))
            localStorage.setItem('token', token)
            state.data = userData
            state.token = token
        })

        builder.addCase(addProfileImage.fulfilled, (state, action) => {
            const { userData } = action.payload
            localStorage.setItem('data', JSON.stringify(userData))
            state.data = userData
        })

        builder.addCase(updateDetails.fulfilled, (state, action) => {
            const { userData } = action.payload
            localStorage.setItem('data', JSON.stringify(userData))
            state.data = userData
        })

        builder.addCase(getUserData.fulfilled, (state, action) => {
            const { userData } = action.payload
            localStorage.setItem('data', JSON.stringify(userData))
            state.data = userData
        })
    }
})

export const { Logout } = userSlice.actions
export default userSlice.reducer