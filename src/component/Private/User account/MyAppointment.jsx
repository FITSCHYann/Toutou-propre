import React, { useContext, useEffect } from 'react'
import userContext from "../../../context/user.context"
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment';
import styles from "./MyAppointment.module.css"
import { BiCalendarX } from "react-icons/bi";
import Swal from 'sweetalert2';

export default function MyAppointment() {
    const { currentUser, currentToken } = useContext(userContext)
    const navigate = useNavigate();
    moment.locale('fr');
    const currentDay = moment().format()

    useEffect(() => {
        if (!currentUser || currentUser.role !== "2") {
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

    const fetchAppointments = async () => {
        const response = await axios.get(`http://localhost:3002/appointment/:id?id=${currentUser.id}`, {
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        })
        return response.data
    }

    const { data: appointments, error, isLoading, refetch } = useQuery("all_user_appointments", fetchAppointments, {
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

    return (
        <div className={styles.myAppointmentContainer}>
            <div className={styles.nextAppointmentContainer}>
                <h2>Mes prochains rendez-vous :</h2>
                <div className={styles.listAppointments}>{nextAppointments ? (nextAppointments.map((e) => {
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
                })) : null}</div></div>
            <div className={styles.oldAppointmentContainer}>
                <h2>Mes anciens rendez-vous :</h2>
                <div className={styles.listAppointments}>{oldAppointments ? (oldAppointments.map((e) => {
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
                })) : null}</div></div>
        </div>
    )
}
