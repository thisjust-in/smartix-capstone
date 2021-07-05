import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import styles from './List.module.css'
import PrimaryBtn from '../Main-Components/PrimaryBtn';

function List(props){

    return (
        <Container style={{backgroundColor: "#F4F4F4"}}>
            <Row className={styles.row}>
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
            <PrimaryBtn text={'See Tickets'}/>
            </Col>
            </Row>
        </Container>
    )
}

export default List;