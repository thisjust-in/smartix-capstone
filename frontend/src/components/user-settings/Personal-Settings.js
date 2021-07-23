import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import classes from "../user-settings/User-setting.module.css";
import { checkWalletIDThunk } from "../../redux/CheckUserSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "redaxios";

const PersonalSetting = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkWalletIDThunk());
  }, []);
  let currentUserId;
  const user_id = useSelector((state) => {
    return state.users.userID;
  });

  if (user_id) {
    currentUserId = user_id;
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    let submitDetails = {
      id: currentUserId,
      email: email,
    };
    await axios.post(`${process.env.REACT_APP_SERVER}/api/edit-email`, {
      submitDetails: submitDetails,
    });
  };
  return (
    <div>
      <h5 className="mb-5">Edit your settings</h5>
      <div>
        <Form onSubmit={handleEmailSubmit} className={classes.formContainer}>
          <Form.Group
            className={classes.FormGroup}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={classes.formInput}
              value={email}
              type="email"
              placeholder="name@example.com"
              onChange={(event) => setEmail(event.target.value)}
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
