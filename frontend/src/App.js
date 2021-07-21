import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./components/notFoundPage/NotFoundPage";
import NavBar from "./components/Main-Components/NavBar";
import EventList from "./Pages/EventList";
import CreateEvent from "./Pages/CreateEvent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEventHostThunk } from "./redux/EventCardSlice";
import OnlineEvents from "./Pages/online-events-page/OnlineEvents";
import SocketIo from "./components/socketio/SocketIo";
import Test from "./Pages/testPage";
import EventDetails from "./Pages/EventDetails";
import Footer from "./components/Footer/Footer";
import Confirmation from "./Pages/Confirmation";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventHostThunk());
  }, [dispatch]);
  
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/list">
            <EventList />
          </Route>
          <Route exact path="/create-event">
            <CreateEvent />
          </Route>
          <Route exact path="/online-events">
            <OnlineEvents />
          </Route>
          <Route exact path="/socket">
            <SocketIo />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>
          <Route exact path="/event/:id">
            <EventDetails />
          </Route>
          <Route exact path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
