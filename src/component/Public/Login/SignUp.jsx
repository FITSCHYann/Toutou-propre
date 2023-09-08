import React from 'react'
import styles from "./Login.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import dog from "../../../assets/dogbath.png"
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const { register, handleSubmit, formState } = useForm()
    const [loading, setLoading] = useState(false)
    const [badRequest, setBadRequest] = useState(false)
    const [badEmail, setBadEmail] = useState("")
    const navigate = useNavigate();

    const onSubmit = data => {
        setLoading(true)
        setBadEmail("")
        axios.post(`http://localhost:3002/login/signup`, data)
            .then((res) => {
                if (res.status === 200) {
                    setBadRequest(false)
                    setLoading(false)

                    Swal.fire({
                        title: 'Inscription',
                        text: "Votre inscription à bien été prise en compte. Vous pouvez maintenant vous connectez",
                        icon: 'warning',
                        confirmButtonColor: '#566E3D',
                        confirmButtonText: 'Ok',
                    }).then((result) => {

                        if (result.isConfirmed) {

                            navigate("/login/signIn")

                        }
                    })

                }
            }).catch((err) => {
                setLoading(false)
                setBadEmail(err.response.data.message)
            })
    }

    return (
        <div className={styles.container}>
            <h2>Inscription :</h2>
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
                        <div className={styles.error}>{badEmail ? "Cette adresse Email est déjà utilisé" : formState && formState.errors?.email?.message ? formState.errors.email.message : " "}</div>
                    </div>
                    <div className={styles.form}>
                        <label htmlFor="password" className={styles.label}>Mot de passe</label>
                        <input
                            placeholder='Mot de passe'
                            type="password"
                            id="password"
                            className={styles.input}
                            style={{ border: formState && formState.errors?.password?.message || badRequest ? "3px solid #eb7732" : null }}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },
                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.password?.message ? formState.errors.password.message : " "}</div>
                    </div>
                    <div className={styles.form}>
                        <label htmlFor="dogname" className={styles.label}>Nom du chien</label>
                        <input
                            placeholder='Nom du chien'
                            type="text"
                            id="dogname"
                            className={styles.input}
                            style={{ border: formState && formState.errors?.dogname?.message || badRequest ? "3px solid #eb7732" : null }}
                            {...register("dogname", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },
                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.dogname?.message ? formState.errors.dogname.message : " "}</div>
                    </div>
                    <div className={styles.form}>
                        <label htmlFor="dogtype" className={styles.label}>Race du chien</label>
                        <input
                            placeholder='Race du chien'
                            type="text"
                            id="dogtype"
                            className={styles.input}
                            style={{ border: formState && formState.errors?.dogtype?.message || badRequest ? "3px solid #eb7732" : null }}
                            {...register("dogtype", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },
                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.dogtype?.message ? formState.errors.dogtype.message : " "}</div>
                    </div>
                    <div className={styles.form}>
                        <label htmlFor="lastname" className={styles.label}>Nom</label>
                        <input
                            placeholder='Nom'
                            type="text"
                            id="lastname"
                            className={styles.input}
                            style={{ border: formState && formState.errors?.lastname?.message || badRequest ? "3px solid #eb7732" : null }}
                            {...register("lastname", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },
                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.lastname?.message ? formState.errors.lastname.message : " "}</div>
                    </div>
                    <div className={styles.form}>
                        <label htmlFor="firstname" className={styles.label}>Prénom</label>
                        <input
                            placeholder='Prénom'
                            type="text"
                            id="firstname"
                            className={styles.input}
                            style={{ border: formState && formState.errors?.firstname?.message || badRequest ? "3px solid #eb7732" : null }}
                            {...register("firstname", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },
                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.firstname?.message ? formState.errors.firstname.message : " "}</div>
                    </div>
                    <div className={styles.form}>
                        <label htmlFor="phone" className={styles.label}>Téléphone</label>
                        <input
                            placeholder='Téléphone'
                            type="tel"
                            id="phone"
                            className={styles.input}
                            style={{ border: formState && formState.errors?.phone?.message || badRequest ? "3px solid #eb7732" : null }}
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Le champ est requis",
                                },
                                pattern: {
                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                                    message: "Le numéro doit contenir aux moins 10 chiffres",
                                },
                            })}
                        />
                        <div className={styles.error}>{formState && formState.errors?.phone?.message ? formState.errors.phone.message : " "}</div>
                    </div>
                    {loading ? <div className={styles.button}>Chargement...</div> : <input className={styles.button} type="submit" value="S'inscrire" />}
                </form>
            </section>
        </div>
    )
}
