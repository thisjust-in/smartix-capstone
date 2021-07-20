import React, { useState } from 'react';
import Header from '../components/Main-Components/Header';
import HeaderContent from '../components/EventListPage/HeaderContent'
import { useEffect } from 'react';
import axios from "redaxios";
import styles from "./EventDetails.module.css"
import { Col, Row, Container } from 'reactstrap';
import { SeatsioSeatingChart} from '@seatsio/seatsio-react'
import PrimaryBtn from "../components/Main-Components/PrimaryBtn"
import web3 from "../web3";
import EventContract from '../EventContract';



function EventDetails(){

    const [eventinfo, setEventinfo] = useState("")
    const [tix, setTix] = useState([])

    let address = "0xF80779bD8Fa8b3f9Dcc01A5A927dd83b261dfF48"

    useEffect(() => {
        async function fetch(){
            let event_id = window.location.pathname.split('/')[2]
            let response = await axios.get(`http://localhost:8080/event/${event_id}`)
            setEventinfo(response.data[0])
        }
        fetch()
    }, [])


    async function select(e) {
        
        let location = e.id
        let tixID = e.category.label
        let accounts = await web3.eth.getAccounts();
        let host = await EventContract.methods.eventLog(address).call()
        let qty = await EventContract.methods.TixQtyPerUser(address, host, tixID).call()
        let wei = await EventContract.methods.TixPrice(address, tixID).call()
        let ether = web3.utils.fromWei(wei, 'ether')

        setTix(tix => [...tix, {
            location: location,
            category: tixID,
            qty: qty,
            price: ether
        }]) 
    }

    function deselect(e) {
        setTix((tix) => {
           return tix.filter((data)=> {
                return data.location !== e.id
            })
        })
    }

    async function checkout() {
        let accounts = await web3.eth.getAccounts();
        let wei = web3.utils.toWei('2', 'ether');
        await EventContract.methods.buyTicket(address, tix[0].category, tix.length).send({from: accounts[0], value: wei})
    }

    return (
        <div>
            <Header backgroundimage={'https://res.cloudinary.com/dnq92mpxr/image/upload/v1625816868/cymlfs5xh7chlfq8znbk.jpg'} content={<HeaderContent avatar={null} title={null} para={null}/>} />
            <Container>
            <div className={styles.container}>
                <h1>{eventinfo.eventName}</h1>
                <h4>{new Date(eventinfo.eventDate).toString().slice(0, 3) + ", " + new Date(eventinfo.eventDate).toString().slice(4, 15) + ", " + new Date(eventinfo.eventDate).toString().slice(16, 21) + ". " + eventinfo.eventLocation}</h4>
            </div>
            <div>
            <Row>
            <Col lg="6">
            <SeatsioSeatingChart 
                workspaceKey="ba650b33-08ea-4845-9c03-8f74fe31c6ce"
                event="24a04996-c2ff-4b11-94e3-3958bba5840e"
                region="na"
                onObjectSelected={select}
                onObjectDeselected={deselect}
  
            />
            </Col>
            <Col lg="6">
            <Container>
            <Row className={styles.titlerow}>
                <Col xs="4" className={styles.col}>
                    <h5>Location</h5>
                </Col>
                <Col xs="4">
                    <h5>Availiable</h5>
                </Col>
                <Col xs="4" className={styles.col2}>
                    <h5>Price</h5>
                </Col>
            </Row>
                {tix.map((data)=>{
                    return (
                        <Row className={styles.row}>
                        <Col xs="4" className={styles.col}>
                            <h6>{data.location}</h6>
                        </Col>
                        <Col xs="4">
                            <h6>{data.qty}</h6>
                        </Col>
                        <Col xs="4" className={styles.col2}>
                            <h6>{data.price}</h6>
                        </Col>
                        </Row>
                    )
                })}
            </Container>
            <PrimaryBtn text={"Checkout"} click={checkout}/>
            </Col>
            </Row>
            </div>
            </Container>
        </div>
    )
}

export default EventDetails;