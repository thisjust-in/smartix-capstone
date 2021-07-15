import React from "react";
import Header from "../components/Main-Components/Header";
import SearchBar from "../components/Home/SearchBar";
import EventCard from "../components/Home/eventCards/EventCard";
import OnlineBanner from "../components/Home/onlineBanner/OnlineBanner";
function Home() {
  return (
    <div>
      <Header backgroundimage={'https://res.cloudinary.com/dnq92mpxr/image/upload/v1625816868/cymlfs5xh7chlfq8znbk.jpg'} content={<SearchBar />} />
      <OnlineBanner />
      <div className="mt-5 mb-5">
        <EventCard />
      </div>
    </div>
  );
}

export default Home;
