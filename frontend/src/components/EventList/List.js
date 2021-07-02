import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { Col, Row, Container } from 'reactstrap';
import styles from './List.module.css'

function List(props){
    let location = useLocation();
    console.log(location)

    return (
        <Container style={{backgroundColor: "#F4F4F4"}}>
            <Row>
            <Col className={styles.column} md="2">
            <h5 className={styles.noMarginPadding} style={{color: '#132BFF'}}>{props.date}</h5>
            <p className={styles.noMarginPadding} style={{color: '#AFAFAF'}}>{props.time}</p>
            </Col>
            <Col className={styles.column} md="7">
            <div className={styles.wrapper}>
            <h4 className={styles.noMarginPadding}>{props.location}</h4>
            </div>
            </Col>
            <Col className={styles.column} md="1">
            <h5 className={styles.noMarginPadding} style={{color: '#132BFF'}}>{props.price}</h5>
            </Col>
            <Col className={styles.column} md="2"> 
            <button className={styles.button}>See Tickets</button>
            </Col>
            </Row>
        </Container>
    )
}

export default List;