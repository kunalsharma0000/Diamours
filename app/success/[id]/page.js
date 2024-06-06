'use client'
import SuccessOrder from '@/components/SuccessOrder/SuccessOrder'
import React from 'react'
import styles from './page.module.css'
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams()
  return (
    <div className={styles.success}>
        <SuccessOrder id={params.id}/>
    </div>
  )
}

export default page