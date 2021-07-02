import React from 'react';
import Header from '../Main-Components/Header';
import backgroundimage from '../assets/backgroundimage.jpg'
import SearchBar from './SearchBar';

function Home(){

    return (
        <div>
        <Header backgroundimage={backgroundimage} content={<SearchBar />}/>
        </div>
    )
}

export default Home;