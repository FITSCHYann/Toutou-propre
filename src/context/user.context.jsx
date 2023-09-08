import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const userContext = createContext()

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [currentToken, setCurrentToken] = useState(null)

    useEffect(() => {
        console.log("passe")

        if (window.localStorage.getItem('APPToken') && window.localStorage.getItem('UserEmail')) {
            const email = window.localStorage.getItem('UserEmail');
            const token = window.localStorage.getItem('APPToken')

            console.log("token context", token)

            if (email && token) {
                const getInfoUser = async () => {
                    const res = await axios.get(`http://localhost:3002/user?email=${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((res) => {
                        const user = res.data.data;
                        setCurrentUser(user);
                        setCurrentToken(token)
                        console.log("ICCI", res)
                    }).catch((err) => {
                        setCurrentUser(null);
                        setCurrentToken(null)
                        window.localStorage.removeItem('APPToken');
                        window.localStorage.removeItem('UserEmail');
                        console.log("err", err)
                        console.log("ca passe la")

                    });

                };
                getInfoUser()
            }
        }
    }, [])



    return (
        <userContext.Provider value={{ currentUser, setCurrentUser, currentToken }}>{children}</userContext.Provider>
    );
}

export default userContext;
