import React from "react";
import Header from "../components/Main-Components/Header";
import backgroundimage from "../components/assets/backgroundimage.jpg";
import SearchBar from "../components/Home/SearchBar";
import EventCard from "../components/Home/eventCards/EventCard";
function Home() {
  return (
    <div>
      <Header backgroundimage={backgroundimage} content={<SearchBar />} />
      <div className="mt-5 mb-5">
        <h6>Upcoming Events</h6>
        <EventCard />
      </div>
    </div>
  );
}

export default Home;
