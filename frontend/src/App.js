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
import YourEvents from "./components/settingPage/YourEvents";
import EventFormTwo from "./Pages/EventFormTwo";
import { checkWalletIDThunk } from "./redux/CheckUserSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventHostThunk());
    dispatch(checkWalletIDThunk());
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/home">
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
          <Route exact path="/event/settings">
            <EventFormTwo />
          </Route>
          <Route exact path="/event/:id">
            <EventDetails />
          </Route>
          <Route exact path="/yourevent">
            <YourEvents />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
