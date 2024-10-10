import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userRdx/userSlice'
import adminslice from './adminRdx/adminSlice'

const store = configureStore ({
    
    reducer: {
        user: userSlice,
        admin: adminslice
    }
})

export default store