import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userRdx/userSlice'

const store = configureStore ({

    reducer: {
        user: userSlice
    }
})

export default store