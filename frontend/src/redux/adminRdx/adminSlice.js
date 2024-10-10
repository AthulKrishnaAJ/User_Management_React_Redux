import { createSlice } from '@reduxjs/toolkit'
import { adminLogin, blockUser, deleteUser, fetchUsers, editUserDetails } from './adminThunk'


const adminToken = localStorage.getItem('adminToken')
? localStorage.getItem('adminToken') : null;

const usersData = localStorage.getItem('usersData')
? JSON.parse(localStorage.getItem('usersData')) : [];



const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminToken: adminToken,
        usersData: usersData
    },
    reducers: {
        Logout: (state) => {
            localStorage.removeItem('adminToken')
            localStorage.removeItem('usersData')
            state.adminToken = null
            state.usersData = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            const token = action.payload
            localStorage.setItem('adminToken', token)
            state.adminToken = token
        })

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            const { data } = action.payload
            localStorage.setItem('usersData', JSON.stringify(data))
            state.usersData = data
        })

        builder.addCase(editUserDetails.fulfilled, (state, action) => {
            const {userId, name, email, mobile} = action.payload
            state.usersData = state.usersData.map((user) =>  
            user._id === userId
            ? {...user, name: name, email: email, mobile: mobile}
            : user
            )
        })
        
        builder.addCase(blockUser.fulfilled, (state, action) => {
            const {userId, block} = action.payload
            state.usersData = state.usersData.map((user) => {
                return (
                    user._id === userId ? {...user, isBlocked: block} : user
                )
            })
        })

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const userId = action.payload
            const userData = state.usersData.filter((user) => user._id !== userId)
            localStorage.setItem('usersData', JSON.stringify(userData))
            state.usersData = userData
        })
    }
})

export default adminSlice.reducer
export const { Logout } = adminSlice.actions