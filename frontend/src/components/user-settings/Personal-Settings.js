import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import classes from "../user-settings/User-setting.module.css";
import { checkWalletIDThunk } from "../../redux/CheckUserSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import web3 from "../../web3";
import axios from "redaxios";

const PersonalSetting = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fileName, setfileName] = useState("filename");
  const dispatch = useDispatch();
  let currentUserId;

  const user_id = useSelector((state) => {
    return state.users.userID;
  });

  if (user_id) {
    currentUserId = user_id;
  }

  useEffect(() => {
    dispatch(checkWalletIDThunk());
  }, [currentUserId]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    let submitDetails = {
      id: currentUserId,
      email: email,
    };
    setEmail("");
    await axios.post(`${process.env.REACT_APP_SERVER}/api/edit-email`, {
      submitDetails: submitDetails,
    });
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    let submitDetails = {
      id: currentUserId,
      username: username,
    };
    setUsername("");
    await axios.post(`${process.env.REACT_APP_SERVER}/api/edit-username`, {
      submitDetails: submitDetails,
    });
  };

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    console.log(file);
    setfileName(file.name);
    // setFileName(file.name);
    // setSelectedFile(file);
    // setPreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <h5 className="mb-5">Edit your settings</h5>
      <div>
        <div>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label className={classes.imageUpload}>
              Large file input example +{" "}
            </Form.Label>
            <Form.Control
              onChange={(event) => handleFileChange(event)}
              name={fileName}
              type="file"
              size="lg"
            />
          </Form.Group>
          <p>{fileName}</p>
        </div>
      </div>
      <div className={classes.formWrapper}>
        <Form onSubmit={handleEmailSubmit} className={classes.formContainer}>
          <Form.Group
            className={classes.FormGroup}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Email</Form.Label>
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
      <div className={classes.formWrapper}>
        <Form onSubmit={handleNameSubmit} className={classes.formContainer}>
          <Form.Group
            className={classes.FormGroup}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={classes.formInput}
              value={username}
              type="text"
              placeholder="username"
              onChange={(event) => setUsername(event.target.value)}
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
