import React, { useState } from 'react';
import Header from '../components/Main-Components/Header';
import HeaderContent from '../components/EventListPage/HeaderContent'
import { useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react'
import axios from "redaxios";
import styles from "./EventDetails.module.css"
import PrimaryBtn from "../components/Main-Components/PrimaryBtn"
import web3 from "../web3";
import EventContract from '../EventContract';
import { SeatsioClient, Region } from 'seatsio'
import { useHistory } from 'react-router';

function EventDetails(){
    const history = useHistory()
    const client = new SeatsioClient(Region.NA(), '886377b9-1e1a-4780-93b3-7d0b480bbad8')
    const [eventinfo, setEventinfo] = useState("")
    const [tix, setTix] = useState([])
    console.log(eventinfo)
    

    async function fetch(){
        let event_id = window.location.pathname.split('/')[2]
        let response = await axios.get(`http://localhost:8080/event/${event_id}`)
        setEventinfo(response.data[0])
    }

    useEffect(() => {
        fetch()
    }, [])

    async function select(e) {
        let location = e.id
        let tixID = e.category.label
        let host = await EventContract.methods.eventLog(eventinfo.contractAddress).call()
        let qty = await EventContract.methods.TixQtyPerUser(eventinfo.contractAddress, host, tixID).call()
        let wei = await EventContract.methods.TixPrice(eventinfo.contractAddress, tixID).call()
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
        let amount = tix.reduce((a, b) => {
            return parseInt(a)+ parseInt(b.price)
        },0)
        let accounts = await web3.eth.getAccounts();
        let wei = web3.utils.toWei(`${amount}`, 'ether');
        await EventContract.methods.buyTicket(eventinfo.contractAddress, tix[0].category, tix.length).send({from: accounts[0], value: wei})

        let data = {
            TixDetails: tix,
            wallet_id: accounts[0],
            contractAddress: eventinfo.contractAddress
        }
        await axios.post('http://localhost:8080/purchase', data)
        console.log("")
        let tixArray = []
        for(let each of tix) {
            tixArray.push(each.location)
        }
        await client.events.book(eventinfo.contractAddress, tixArray)
        history.push('/confirmation')
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
            {eventinfo.contractAddress ? <SeatsioSeatingChart 
                workspaceKey="ba650b33-08ea-4845-9c03-8f74fe31c6ce"
                event={eventinfo.contractAddress}
                region="na"
                onObjectSelected={select}
                onObjectDeselected={deselect}
                onChartRendered={(e)=>{console.log(e)}}
            /> : null }

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