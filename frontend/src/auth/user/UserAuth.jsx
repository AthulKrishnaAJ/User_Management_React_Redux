import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const UserAuth = ({children}) => {
    const navigate = useNavigate()
    const token = useSelector((store) => store.user.token)

    useEffect(() => {
        if(!token){
            console.log('User has no token')
            navigate('/login')
        }
    }, [])

    if(token){
        return children
    }
}

export default UserAuth

export const UserLoggedIn = ({children}) => {
    const navigate = useNavigate()
    const token = useSelector((store) => store.user.token)

    useEffect(() => {   
        if(token){
            console.log('user have token')
            navigate('/')
        }
    })

    if(!token){
        return children
    }
}