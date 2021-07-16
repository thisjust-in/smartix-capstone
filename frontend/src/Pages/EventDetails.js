import React, { useState } from 'react';
import Header from '../components/Main-Components/Header';
import HeaderContent from '../components/EventListPage/HeaderContent'
import { useEffect } from 'react';
import axios from "redaxios";
import styles from "./EventDetails.module.css"
import { Col, Row, Container } from 'reactstrap';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react'

function EventDetails(){

    const [eventinfo, setEventinfo] = useState("")

    useEffect(() => {
        async function fetch(){
            let event_id = window.location.pathname.split('/')[2]
            let response = await axios.get(`http://localhost:8080/event/${event_id}`)
            setEventinfo(response.data[0])
        }
        fetch()

        const script = document.createElement('script');
        script.src = "../seatsio";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }

    }, [])

    return (
        <div>
            <Header backgroundimage={'https://res.cloudinary.com/dnq92mpxr/image/upload/v1625816868/cymlfs5xh7chlfq8znbk.jpg'} content={<HeaderContent avatar={null} title={null} para={null}/>} />
            <Container>
            <div className={styles.container}>
                <h1>{eventinfo.eventName}</h1>
                <h4>{new Date(eventinfo.eventDate).toString().slice(0, 3) + ", " + new Date(eventinfo.eventDate).toString().slice(4, 15) + ", " + new Date(eventinfo.eventDate).toString().slice(16, 21) + ". " + eventinfo.eventLocation}</h4>
            </div>
            <div>
            <Row className={styles.row}>
            <Col md="6">
            <SeatsioSeatingChart 
            workspaceKey="<886377b9-1e1a-4780-93b3-7d0b480bbad8>"
            event="<yourEventKey>"
            id="<theChartDivID>"
            region="na"/>
            </Col>
            <Col md="6">
                YO
            </Col>
            </Row>
            </div>
            </Container>
        </div>
    )
}

export default EventDetails;