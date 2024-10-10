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

    console.log('children: ', children)

    if(token){
        console.log('token inddddd')
        return children
    }
}

export default UserAuth

