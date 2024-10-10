import React from 'react'
import AdminLogin from '../../components/admin/AdminLogin'
import { Toaster } from 'sonner'

function Login() {
  return (
    <div>
        <Toaster position="top-center" richColors/>
        <AdminLogin/>
    </div>
  )
}

export default Login
