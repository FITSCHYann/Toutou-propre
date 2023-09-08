import React, { useContext, useEffect, useState } from 'react'
import userContext from "../../../context/user.context"
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import styles from "./Admin.module.css"
import { BiChevronDown } from "react-icons/bi";
import UserProfil from './UserProfil';

export default function Users() {
    const { currentUser, currentToken } = useContext(userContext)
    const [openUser, setOpenUser] = useState(false);
    const [idUser, setIdUser] = useState(null)
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const response = await axios.get("http://localhost:3002/users", {
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        })
        return response.data
    }

    const { data: users, error, isLoading } = useQuery("all_users", fetchUsers, {
        // initialData: null,
        // staleTime: Infinity,
        cacheTime: 0,
    })



    useEffect(() => {
        if (!currentUser || currentUser.role !== "1") {
            navigate("/")
        }
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const userProfil = (userId) => {
        setIdUser(userId)
        setOpenUser(true)

    };

    return (
        <>
            {openUser ? (
                <UserProfil setOpenUser={setOpenUser} setIdUser={setIdUser} idUser={idUser} />
            ) : (
                <div className={styles.usersContainer}>
                    <div className={styles.title}>Utilisateurs :</div>
                    <div className={styles.usersListTitle}>
                        <div className={styles.dognameList}>Chien</div>
                        <div className={styles.lastnameList}>Nom</div>
                        <div className={styles.firstnameList}>Prénom</div>
                        <div className={styles.phoneList}>Téléphone</div>
                        <div className={styles.userProfil}> </div>
                    </div>

                    {users && users.data && users?.data.map(user => {

                        return <div key={user.id} className={styles.usersList}>
                            <div className={styles.dognameList}>{user.dogname}</div>
                            <div className={styles.lastnameList}>{user.lastname}</div>
                            <div className={styles.firstnameList}>{user.firstname}</div>
                            <div className={styles.phoneList}>{user.phone}</div>
                            <div className={styles.userProfil} style={{ cursor: "pointer" }} onClick={() => userProfil(user.id)}> Profil</div>

                        </div>
                    })}
                </div>)}

        </>

    )
}
