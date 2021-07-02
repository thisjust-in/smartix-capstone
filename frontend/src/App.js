import "./App.css";
import MetaMaskBtn from "./components/MetaMaskBtn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/notFoundPage/NotFoundPage";
import NavBar from "./components/Main-Components/NavBar";
import EventList from "./components/EventList/EventList";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
              <Route exact path="/">
                <MetaMaskBtn />
              </Route>
              <Route exact path="/home">
                <Home/>
              </Route>
              <Route exact path='/list' >
                <EventList />
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
