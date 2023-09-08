import moment from 'moment/moment';
import React, { useContext, useState } from 'react'
import userContext from "../../../context/user.context"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/fr';
import axios from 'axios';
import { useQuery } from 'react-query';
import styles from "./User.module.css"
import Swal from 'sweetalert2';
import "../../../react-calendar.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TakeAppointment() {
    const navigate = useNavigate();
    moment.locale('fr');
    const { currentUser, currentToken } = useContext(userContext)
    const [value, onChange] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(moment(value).format())
    const [currentDay, setCurrentDay] = useState(moment().format())
    const [dayNow, setDayNow] = useState(moment().format("dddd Do MMMM YYYY"))

    useEffect(() => {
        if (!currentUser) {
            navigate("/login/signIn")
        }
    }, [])

    const fetchAppointments = async () => {
        const response = await axios.get(`http://localhost:3002/appointments/:month?date=${currentMonth}`
            , {
                headers: {
                    Authorization: `Bearer ${currentToken}`
                }
            })
        return response.data
    }

    const postAppointments = (slotChoose) => {
        axios.post(`http://localhost:3002/appointment`, { date: currentDay, timeslot: slotChoose, clientId: currentUser?.id })
            .then((res) => {
                if (res.status === 200) {
                    refetch()
                }
            })
    }

    const { data: appointments, refetch } = useQuery("get_appointments", fetchAppointments, {
        // initialData: null,
        // staleTime: Infinity,
        cacheTime: 0,
    })

    const haveAppointment = appointments?.data.filter(appointment => moment(appointment.date).format("dddd Do MMMM YYYY").includes(dayNow))

    const takeAppointment = (slot) => {

        const slotChoose = slot.id

        Swal.fire({
            title: 'Confirmez-vous ce rendez-vous ?',
            text: "Le " + dayNow + ". Pour le créneau " + slot.time,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#566E3D',
            cancelButtonColor: '#eb7732',
            confirmButtonText: 'Oui, je confirme !',
            cancelButtonText: "Annuler"
        }).then((result) => {

            if (result.isConfirmed) {
                postAppointments(slotChoose)

                Swal.fire(
                    'Votre rendez-vous a été confirmer !',
                    "Le " + dayNow + ". Pour le créneau " + slot.time,
                    'success'
                )

            }
        })
    }

    return (
        <>
            {currentUser ? (
                <div className={styles.takeAppointment}>
                    <h1>Prendre un rendez-vous</h1>
                    <div className={styles.appointmentContainer}>
                        <div className={styles.calendarContainer}>

                            <Calendar
                                onChange={onChange}
                                onClickDay={(value) => { setCurrentDay(value); setDayNow(moment(value).format("dddd Do MMMM YYYY")) }}
                                onActiveStartDateChange={(e) => setCurrentMonth(moment(e.activeStartDate).format())}
                                value={value}
                            />
                        </div>
                        {dayNow.includes("dimanche" || "lundi") || dayNow.includes("lundi") ? (
                            <div className={styles.infoContainer}>
                                <div className={styles.currentDay}>
                                    Le salon est fermé le dimanche et le lundi.
                                </div>
                            </div>
                        ) : (
                            <div className={styles.infoContainer}>
                                <div className={styles.currentDay}>Créneau disponible pour le : <br /><br />{dayNow}</div>

                                <div className={styles.timeSlotContainer}>
                                    {(() => {
                                        const redSlots = new Set();

                                        haveAppointment && haveAppointment.forEach((e) => {
                                            if (e.timeslot === 'slot1') {
                                                redSlots.add('9h00 - 10h30');
                                            }
                                            if (e.timeslot === 'slot2') {
                                                redSlots.add('10h30 - 12h00');
                                            }
                                            if (e.timeslot === 'slot3') {
                                                redSlots.add('13h00 - 14h30');
                                            }
                                            if (e.timeslot === 'slot4') {
                                                redSlots.add('14h30 - 16h00');
                                            }
                                            if (e.timeslot === 'slot5') {
                                                redSlots.add('16h00 - 17h30');
                                            }
                                        });

                                        const allSlots = [
                                            { id: "slot1", time: "9h00 - 10h30" },
                                            { id: "slot2", time: "10h30 - 12h00" },
                                            { id: "slot3", time: "13h00 - 14h30" },
                                            { id: "slot4", time: "14h30 - 16h00" },
                                            { id: "slot5", time: "16h00 - 17h30" },
                                        ];

                                        return (
                                            <div className={styles.timeSlotList}>
                                                {allSlots.map((slot) => (
                                                    <div className={styles.timeSlot} key={slot.id}>
                                                        <div
                                                            style={{ color: redSlots.has(slot.time) ? '#eb7732' : 'black' }}
                                                            className={styles.timeSlotHours}
                                                        >
                                                            {slot.time}
                                                        </div>
                                                        {!redSlots.has(slot.time) ? (<div className={styles.timeSlotButton} onClick={() => takeAppointment(slot)}>Disponible</div>) : (<div className={styles.timeSlotNoButton}>Indisponible</div>)}

                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })()}
                                </div>

                            </div>)}

                    </div></div>) : (<></>)}
        </>
    )
}
