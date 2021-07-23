import { Form, Button } from "react-bootstrap";
import classes from "../user-settings/User-setting.module.css";

const PersonalSetting = () => {
  const handleEmailSubmit = () => {
    console.log("submit email");
  };
  return (
    <div>
      <h5>Edit your settings</h5>
      <div>
        <Form onSubmit={handleEmailSubmit} className={classes.formContainer}>
          <Form.Group
            className={classes.FormGroup}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={classes.formInput}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Button className={classes.SubmitBtn} type="submit" variant="dark">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PersonalSetting;
