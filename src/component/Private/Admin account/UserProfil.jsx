import React, { useContext, useEffect, useState } from 'react'
import userContext from "../../../context/user.context"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import styles from "./UserProfil.module.css"
import { BiArrowBack } from "react-icons/bi";
import moment from 'moment';
import { BiCalendarX } from "react-icons/bi";
import Swal from 'sweetalert2';

function UserProfil({ setOpenUser, setIdUser, idUser }) {
    const { currentUser, currentToken } = useContext(userContext)
    const navigate = useNavigate();
    const [lastname, setLastname] = useState("")
    const [edit, setEdit] = useState("")
    moment.locale('fr');
    const currentDay = moment().format()


    useEffect(() => {
        if (!currentUser || currentUser.role !== "1") {
            navigate("/")
        }
    }, [])

    const deleteAppointment = async (appointmentId) => {
        const response = await axios.delete(`http://localhost:3002/appointment/:id?id=${appointmentId}`, {
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        })
            .then(() => refetch())
    }

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:3002/user/${idUser}`, {
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        })
        return response.data
    }

    const { data: user, } = useQuery("one_user", fetchUser, {
        // initialData: null,
        // staleTime: Infinity,
        cacheTime: 0,
    })

    const fetchAppointments = async () => {
        const response = await axios.get(`http://localhost:3002/appointment/:id?id=${idUser}`, {
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        })
        return response.data
    }

    const { data: appointments, refetch } = useQuery("all_user_appointments_admin", fetchAppointments, {
        // initialData: null,
        // staleTime: Infinity,
        cacheTime: 0,
    })

    const nextAppointments = appointments?.data.filter((app) => moment(app.date).isAfter(currentDay))
    const oldAppointments = appointments?.data.filter((app) => moment(app.date).isBefore(currentDay))

    const deleteApp = (e) => {

        Swal.fire({
            title: 'Voulez-vous annuler ce rendez-vous ?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#566E3D',
            cancelButtonColor: '#eb7732',
            confirmButtonText: 'Oui, je confirme !',
            cancelButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                deleteAppointment(e.id);

                Swal.fire(
                    'Votre rendez-vous a été annuler !',
                    "",
                    'success'
                )

            }
        })

    }

    console.log(user?.data)

    return (
        <div className={styles.userContainer}>
            <div className={styles.backToUsers} onClick={() => { setOpenUser(false) }}><BiArrowBack /></div>
            <div className={styles.title}><h1>Profil de : {user?.data.firstname}</h1></div>
            <div className={styles.userHeader}>

                <div className={styles.userProfil}>

                    <div>Prénom : {user?.data.lastname}</div>
                    <div>Nom : {user?.data.firstname}</div>
                    <div>Nom du chien : {user?.data.dogname}</div>
                    <div>Race du chien : {user?.data.dogtype}</div>
                    <div>Email : {user?.data.email}</div>
                    <div>Numero de telephone : {user?.data.phone}</div>
                    <div>Adresse : {user?.data.adress}</div>
                    <div>Ville : {user?.data.city}</div>
                    <div>Code postal : {user?.data.zipcode}</div>
                    <div>pays : {user?.data.country}</div>
                    <div>Compte créé le : {moment(user?.data.createdAt).format("dddd Do MMMM YYYY")}</div>


                </div>
                <div className={styles.nextAppointment}>
                    <h2>Prochain rendez vous :</h2>
                    {nextAppointments ? (nextAppointments.map((e) => {
                        return (
                            <div key={e.id} className={styles.newAppointment}>
                                <div className={styles.dateAppointment}>
                                    <h6>Date :</h6>
                                    {moment(e.date).format("dddd Do MMMM YYYY")}
                                </div>
                                <div className={styles.hoursAppointment}>
                                    <h6>Heure :</h6>
                                    {e.timeslot === "slot1" ? "9h00 - 10h30" :
                                        e.timeslot === "slot2" ? "10h30 - 12h00" :
                                            e.timeslot === "slot3" ? "13h00 - 14h30" :
                                                e.timeslot === "slot4" ? "14h30 - 16h00" :
                                                    e.timeslot === "slot5" ? "16h00 - 17h30" : ""}
                                </div>
                                <BiCalendarX style={{ fontSize: "1.7em", color: "#824a1e", width: "10%", cursor: "pointer" }} onClick={() => deleteApp(e)} />
                            </div>
                        )
                    })) : null}</div>
            </div>
            <div className={styles.oldAppointmentContainer}>
                <h2>Ancien rendez vous :</h2>
                {oldAppointments ? (oldAppointments.map((e) => {
                    return (
                        <div key={e.id} className={styles.oldAppointment}>
                            <div className={styles.dateAppointment}>
                                <h6>Date :</h6>
                                {moment(e.date).format("dddd Do MMMM YYYY")}
                            </div>
                            <div className={styles.hoursAppointment}>
                                <h6>Heure :</h6>
                                {e.timeslot === "slot1" ? "9h00 - 10h30" :
                                    e.timeslot === "slot2" ? "10h30 - 12h00" :
                                        e.timeslot === "slot3" ? "13h00 - 14h30" :
                                            e.timeslot === "slot4" ? "14h30 - 16h00" :
                                                e.timeslot === "slot5" ? "16h00 - 17h30" : ""}</div></div>
                    )
                })) : null}</div>

        </div>
    )
}

export default UserProfil