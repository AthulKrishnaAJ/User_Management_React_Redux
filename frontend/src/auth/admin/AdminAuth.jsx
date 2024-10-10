import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminAuth = ({children}) => {
    const token = useSelector((store) => store.admin.adminToken)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/admin/login')
        }
    }, [])

    if (token) {
        return children
    }

}

export default AdminAuth