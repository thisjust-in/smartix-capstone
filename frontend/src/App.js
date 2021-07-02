import "./App.css";
import MetaMaskBtn from "./components/MetaMaskBtn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/notFoundPage/NotFoundPage";
import EventList from "./components/EventListPage/EventList";

function App() {
  return (
    <Router>
      <div className="App">
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
