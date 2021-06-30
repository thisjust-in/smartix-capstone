import "./App.css";
import MetaMaskBtn from "./components/MetaMaskBtn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EventCardBackground from "./components/eventCards/EventCard";
import NotFound from "./components/notFoundPage/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <MetaMaskBtn />
          </Route>
          <Route exact path="/home">
            <EventCardBackground />
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
