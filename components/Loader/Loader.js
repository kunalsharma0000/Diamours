import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  console.log('Loader')
  return (
    <div className={styles.loaderWrap}>
      
        <img src="/assets/img/loader.gif" alt="" />
    </div>
  )
}

export default Loader