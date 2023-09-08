import React, { useContext, useEffect } from 'react'
import userContext from "../../../context/user.context"
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
    const { currentUser } = useContext(userContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== "1") {
            navigate("/")
        }
    }, [])


    return (
        <div>Admin</div>
    )
}
