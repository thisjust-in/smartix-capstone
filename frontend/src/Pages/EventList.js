import React from 'react';
import Header from '../components/Main-Components/Header';
import HeaderContent from '../components/EventListPage/HeaderContent'
import List from '../components/EventListPage/List'
import { useSelector } from 'react-redux'

function EventList(){
    let event_list = useSelector((state) => state.eventlist.event_list);
    let formatlist = event_list.map((each) => {
        return {...each, eventDate: new Date(each.eventDate).toString()}
    })

    console.log(formatlist)

    let users = []
    for (let each of event_list) {
        users.push(each.users_id)
    }
    let distinct = [...new Set(users)]

    function avatarRendering (arr) {
        if (arr.length === 1){
            return event_list[0].userProfile_pic.pc1.toString()
        } else {
            return null
        }
    }

    function titleRendering (arr) {
        if (arr.length === 1){
            return event_list[0].username
        } else {
            return null
        }
    }

    function typeRendering (arr) {
        if (arr.length === 1){
            return event_list[0].eventType
        } else {
            return null
        }
    }

    return (
        <div>
            <Header backgroundimage={'https://res.cloudinary.com/dnq92mpxr/image/upload/v1625816868/cymlfs5xh7chlfq8znbk.jpg'} content={<HeaderContent avatar={avatarRendering(distinct)} title={titleRendering(distinct)} para={typeRendering(distinct)}/>} />
            <h2 style={{padding: '3rem'}}>Upcoming Events</h2>
            {
            formatlist.map((each)=>{
                return  <List date={each.eventDate.slice(4, 10)} time={each.eventDate.slice(0, 3) + " " + each.eventDate.slice(16, 21)} name={each.eventName} location={each.eventLocation}  id={each.event_id}/>
            })
            }

           
        </div>
    )
}

export default EventList;