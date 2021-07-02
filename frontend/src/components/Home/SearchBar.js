import React, { useState } from 'react';
import { Container, Row, Col, Label, Input } from 'reactstrap';
import styles from './SearchBar.module.css'
import axios from "redaxios";

function SearchBar(){

    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');

    function getLocation(e){
        setLocation(e.target.value)
    }
    function getDate(e){
        setDate(e.target.value)
    }
    function getName(e){
        setName(e.target.value)
    }
    async function search(e){
        e.preventDefault()
        let searchResult = {
            location: location,
            date: date,
            name: name
        }
        try{
            let data = await axios.post('http://localhost:8080/api/getlist', searchResult)
            
        } catch {

        }
    }


    return (
        <Container>
        <h1 style={{color: 'white', paddingBottom: '2rem'}}>The World's Best Events</h1>
        <Container style={{backgroundColor: '#F2F2F2', borderRadius: '10px'}}>
            <Row>
                <Col md='3' className={styles.column}>
                <Label>City</Label>
                <Input onChange={getLocation} type="text" placeholder="Hong Kong, Hong Kong" style={{ backgroundColor: '#E0E0E0', borderRadius: '5px'}} />
                </Col>
                <Col md='3' className={styles.column}>
                <Label>Find by Date</Label>
                <Input onChange={getDate} type="date" style={{backgroundColor: '#E0E0E0', borderRadius: '5px'}} />
                </Col>
                <Col md='4' className={styles.column}>
                <Label>Search by Host Name</Label>
                <Input onChange={getName} type="text" style={{backgroundColor: '#E0E0E0', borderRadius: '5px'}} />
                </Col>
                <Col md='1' className={styles.column}>
                    <button onClick={search} className={styles.button}>Search</button>
                </Col>
            </Row>
        </Container>
        </Container>
    )
}

export default SearchBar;