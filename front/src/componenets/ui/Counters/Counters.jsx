import React from 'react'
import styles from './Counters.module.scss'

const Counters = ({minutes, workouts, kgs}) => {
  console.log(minutes)
  const counters = {
    minutes: 7,
    workouts: 1,
    kgs: 5
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.count}>
        <div className={styles.heading}>{"Minutes"}</div>
        <div className={styles.number}>{minutes}</div>
      </div>
      <div className={styles.count}>
        <div className={styles.heading}>{"Workouts"}</div>
        <div className={styles.number}>{workouts}</div>
      </div>
      <div className={styles.count}>
        <div className={styles.heading}>{"Kilogram"}</div>
        <div className={styles.number}>{kgs}</div>
      </div>
    </div>
  )
}

export default Counters