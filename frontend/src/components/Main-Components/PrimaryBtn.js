import React from 'react';
import styles from './PrimaryBtn.module.css'

function PrimaryBtn (props){
    return (
        <div>
            <button className={styles.button} onClick={props.click} >{props.text}</button>
        </div>
    )
}

export default PrimaryBtn;