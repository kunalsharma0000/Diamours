import React from 'react'
import styles from './TeamCard.module.css'

const TeamCard = ({img, name, desg}) => {
  return (
    <div className={styles.teamCard}>
      {/* <div className={styles.teamImg}><img src={`/assets/img/${img}`} alt="" /></div> */}
      <div className={styles.teamText}>
        <div className={styles.teamName}>{name}</div>
        <div className={styles.teamDesg}>{desg}</div>
      </div>
    </div>
  )
}

export default TeamCard