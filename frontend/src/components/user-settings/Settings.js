import { Tab, Row, Col, Nav } from "react-bootstrap";
import YourEvents from "../settingPage/YourEvents";
import PurchasedTickets from "../settingPage/PurchasedTickets";
import PersonalSetting from "./Personal-Settings";
import classes from "../user-settings/User-setting.module.css";


const Settings = () => {
  return (
    <div className={classes.tabContainer}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="first">
                  Personal Settings
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="second">
                  Your Events
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="third">
                  Purchased Tickets
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first" className={classes.column}>
                <div id={classes.tabOneDiv}>
                  <PersonalSetting />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div id={classes.tabDiv}>
                  <YourEvents />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <div id={classes.tabDiv}>
                  <PurchasedTickets />
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Settings;
