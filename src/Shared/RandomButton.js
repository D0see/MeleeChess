import React from 'react'
import styles from './RandomButton.module.css'

export default function RandomButton({onClick, className, disabled}) {
  return (
    <button className={`${className} ${styles.RandomButton}`} onClick={onClick} disabled={disabled}>?</button>
  )
}
