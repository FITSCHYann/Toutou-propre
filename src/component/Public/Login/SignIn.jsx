import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import userContext from "../../../context/user.context"
import dog from "../../../assets/dogshower.png"


export default function SignIn() {
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(userContext)
    const [loading, setLoading] = useState(false)
    const [badRequest, setBadRequest] = useState(false)

    const onSubmit = data => {
        setLoading(true)
        axios.post(`http://localhost:3002/login/signin`, data)
            .then((res) => {
                const role = res.data.data.role
                if (res.status === 200) {
                    setCurrentUser(res.data.data)
                    setBadRequest(false)
                    setLoading(false)
                    window.localStorage.setItem('APPToken', res.data.token);
                    window.localStorage.setItem('UserEmail', res.data.data.email);
                    if (role === "1") {
                        navigate("/Admin")
                    } else {
                        navigate("/User")
                    }
                }
            })
            .catch((err) => {
                setLoading(false)
                setBadRequest(true)
                console.log("err", err)
            })
    }


    return (
        <div className={styles.container}>
            <h2>Connexion :</h2>
            <section className={styles.loginContainer}>
                <img className={styles.loginPicture} src={dog} alt='' />
                <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.form}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            placeholder='Adresse email'
                            type="text"
                            id="email"
                            className={styles.input}
                            style={{ border: formState && formState.errors?.email?.message || badRequest ? "3px solid #eb7732" : null }}
                            autoComplete='off'
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },

                                pattern: {
                                    value:
                                        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                                    message: "L'email est invalide",
                                },

                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.email?.message ? formState.errors.email.message : badRequest ? "Mauvais email ou mot de passe" : " "}</div>

                    </div>
                    <div className={styles.form}>
                        <label htmlFor="password" className={styles.label}>Mot de passe</label>
                        <input
                            placeholder='Mot de passe'
                            type="password"
                            id="password"
                            autoComplete='off'
                            className={styles.input}
                            style={{ border: formState && formState.errors?.password?.message || badRequest ? "3px solid #eb7732" : null }}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },
                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.password?.message ? formState.errors.password.message : badRequest ? "Mauvais email ou mot de passe" : " "}</div>
                    </div>
                    {loading ? <div className={styles.button}>Chargement...</div> : <input className={styles.button} type="submit" value="Se connecter" />}
                    <div className={styles.toSubscription}>
                        <div >Vous possédez pas de compte ?  <a style={{ cursor: "pointer", color: "#0C4767", borderBottom: "2px solid #0C4767" }} onClick={() => navigate("/login/signUp")}>Inscrivez-vous</a></div>
                    </div>
                </form>
            </section>
        </div>
    )
}
