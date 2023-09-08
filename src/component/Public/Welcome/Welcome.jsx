import React from 'react'
import dog from "../../../assets/welcome.png"
import styles from "./Welcome.module.css"

export default function Welcome() {
    return (
        <div className={styles.welcomeContainer}>
            <img className={styles.welcomePicture} src={dog} alt='' />
        </div>
    )
}
