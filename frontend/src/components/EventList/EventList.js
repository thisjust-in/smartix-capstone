import React from 'react';
import Header from '../Main-Components/Header';
import HeaderContent from './HeaderContent'
import List from './List'
import { useSelector } from 'react-redux'
import backgroundimage from '../assets/backgroundimage.jpg'

import avatar from '../assets/image 3.png'

function EventList(){
    let profile_pic = useSelector((state) => state.event.profile_pic);
    let artist = useSelector((state) => state.event.artist);
    let type = useSelector((state) => state.event.event_type);
    let location = useSelector((state) => state.event.location);
    let event_date = useSelector((state) => state.event.event_date).toString()
    let date = event_date.slice(4, 9)
    let time = event_date.slice(0, 2) + " " + event_date.slice(16, 23)
    let price = useSelector((state) => state.token.price);

    return (
        <div>
            <Header backgroundimage={backgroundimage} content={<HeaderContent avatar={profile_pic} title={artist} para={type}/>} />
            <h2 style={{padding: '3rem'}}>Upcoming Events</h2>
            <List date={date} time={time} location={location} price={price} />
        </div>
    )
}

export default EventList;