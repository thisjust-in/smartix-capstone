import React from 'react';
import styles from './PrimaryBtn.module.css'

function PrimaryBtn (props){
    return (
        <div>
            <button className={styles.button}>{props.text}</button>
        </div>
    )
}

export default PrimaryBtn;