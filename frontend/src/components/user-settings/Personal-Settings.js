import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import classes from "../user-settings/User-setting.module.css";
import { checkWalletIDThunk } from "../../redux/CheckUserSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "redaxios";
import PersonalInfo from "./Personal-Details";
import { useHistory } from "react-router-dom";

const PersonalSetting = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [username, setUsername] = useState("");
  const [newUpload, setNewUpload] = useState();
  const [profilePic, setProfilePic] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkWalletIDThunk());
  }, [dispatch]);
  let currentUserId;

  const user_id = useSelector((state) => {
    return state.users.userID;
  });

  if (typeof user_id === "number") {
    currentUserId = user_id;
  }

  async function getUser() {
    if (currentUserId) {
      await axios
        .post(`${process.env.REACT_APP_SERVER}/api/getInfo`, {
          id: currentUserId,
        })
        .then((response) => {
          setProfilePic(response.data[0].userProfile_pic);
          setUserEmail(response.data[0].email);
          setUserInfo(response.data[0].username);
        });
    }
  }

  useEffect(() => {
    dispatch(checkWalletIDThunk());
    getUser();
  }, [currentUserId][(username, userEmail, profilePic)]);

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

  // handle profile image change
  const handleFileChange = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log();
      setNewUpload(reader.result);
    };
    // setfileName(file.name);
  };
  // handle image submit
  const handleImageSubmit = async (event) => {
    event.preventDefault();
    let data = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/profile-picture`,
      {
        photo: newUpload,
        id: currentUserId,
      }
    );
    setProfilePic(data);
  };

  return (
    <div>
      <PersonalInfo
        profilePic={profilePic}
        email={userEmail}
        username={userInfo}
      />
      <hr></hr>
      <h5 className="mb-4">Edit your settings</h5>
      <div>
        <div id={classes.uploadDiv}>
          <Form onSubmit={handleImageSubmit} className={classes.imageForm}>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label className={classes.imageUpload}>+</Form.Label>
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.Control
                onChange={(event) => handleFileChange(event)}
                type="file"
                size="lg"
                required
              />
            </Form.Group>
            <Button className={classes.SubmitBtn} type="submit" variant="dark">
              Update
            </Button>
          </Form>
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
              required
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
              required
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
