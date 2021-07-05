import React from 'react';
import Header from '../Main-Components/Header';
import HeaderContent from './HeaderContent'
import List from './List'
import { useSelector } from 'react-redux'
import backgroundimage from '../assets/backgroundimage.jpg'
// import avatar from '../assets/image 3.png'

function EventList(){
    let event_list = useSelector((state) => state.eventlist.event_list);
    let formatlist = event_list.map((each) => {
        return {...each, eventDate: new Date(each.eventDate).toString()}
    })

    let distinct = event_list.filter((each)=>{
        return each.users_id != event_list[0].users_id
    })

    console.log(distinct)


    return (
        <div>
            <Header backgroundimage={backgroundimage} content={<HeaderContent avatar={distinct[0] ? null : event_list[0].userProfile_pic.pc1.toString()} title={distinct[0] ? null : event_list[0].username} para={distinct[0] ? null : event_list[0].eventType}/>} />
            <h2 style={{padding: '3rem'}}>Upcoming Events</h2>
            {
            formatlist.map((each)=>{
                return  <List date={each.eventDate.slice(4, 10)} time={each.eventDate.slice(0, 3) + " " + each.eventDate.slice(16, 21)} location={each.eventLocation}  />
            })
            }

           
        </div>
    )
}

export default EventList;