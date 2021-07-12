import React from "react";
import Header from "../components/Main-Components/Header";
import backgroundimage from "../components/assets/backgroundimage.jpg";
import SearchBar from "../components/Home/SearchBar";
import EventCard from "../components/Home/eventCards/EventCard";
import OnlineBanner from "../components/Home/onlineBanner/OnlineBanner";
function Home() {
  return (
    <div>
      <Header backgroundimage={backgroundimage} content={<SearchBar />} />
      <OnlineBanner />
      <div className="mt-5 mb-5">
        <EventCard />
      </div>
    </div>
  );
}

export default Home;
