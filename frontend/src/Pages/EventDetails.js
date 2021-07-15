import React from 'react';
import Header from '../components/Main-Components/Header';
import HeaderContent from '../components/EventListPage/HeaderContent'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from "redaxios";

function EventDetails(){

    let event_id = window.location.pathname.split('/')[2]

    // useEffect( async () => {
    //     let response = await axios.get(`http://localhost:8080/event/${event_id}`)
    //     console.log(response.data)
    // }, [])

    let eventName = useSelector((state) => state.eventdetail.eventName);
    let eventLocation = useSelector((state) => state.eventdetail.eventLocation);
    let eventPhoto = useSelector((state) => state.eventdetail.eventPhoto);
    let eventDescription = useSelector((state) => state.eventdetail.eventDescription);
    let eventDate = useSelector((state) => state.eventdetail.eventDate);
    let eventCapacity = useSelector((state) => state.eventdetail.eventCapacity);
    let eventType = useSelector((state) => state.eventdetail.eventType);
    let isOnline = useSelector((state) => state.eventdetail.isOnline);
    let host = useSelector((state) => state.eventdetail.host);
    let eventAddress = useSelector((state) => state.eventdetail.eventAddress);
    let hostaddress = useSelector((state) => state.eventdetail.hostaddress);
    let tokenName = useSelector((state) => state.eventdetail.tokenName);
    let tokenPrice = useSelector((state) => state.eventdetail.tokenPrice);
    let tokenQuantity = useSelector((state) => state.eventdetail.tokenQuantity);

    return (
        <div>
            <Header backgroundimage={'https://res.cloudinary.com/dnq92mpxr/image/upload/v1625816868/cymlfs5xh7chlfq8znbk.jpg'} content={<HeaderContent avatar={null} title={null} para={null}/>} />
        </div>
    )
}

export default EventDetails;