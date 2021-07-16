import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkWalletIDThunk } from "../../redux/CheckUserSlice";
import { Form, Row, Col } from "react-bootstrap";
import classes from "./EventForm.module.css";
import axios from "redaxios";
import EventContract from "../../EventContract";
import web3 from "../../web3";
import TimePicker from "react-bootstrap-time-picker";
import { timeFromInt } from "time-number";

export const EventForm = () => {
  const [eventname, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [filename, setFileName] = useState("No file selected");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("0");
  let currentUserId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkWalletIDThunk());
  }, []);

  const user_id = useSelector((state) => {
    return state.users.userID;
  });
  if (user_id) {
    // console.log("user_ID", user_id);
    currentUserId = user_id;
  }

  // handle time input changes
  const handleTimeChange = (event) => {
    let time = event;
    console.log(timeFromInt(time));
    setEndTime(timeFromInt(time));
  };

  const handleStartTime = (event) => {
    let time = event;
    console.log(timeFromInt(time));
    setStartTime(timeFromInt(time));
  };
  // handle image upload to show preview
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // sort image upload
    let eventPhoto;
    let eventDetails;
    // console.log(currentUserId);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      let contractAddress;
      let accounts = await web3.eth.getAccounts();
      await EventContract.methods.newEvent().send({ from: accounts[0] });
      await EventContract.getPastEvents(
        "allEvents",
        { fromBlock: "latest", toBlock: "latest" },
        (err, events) => {
          let info = events[0].raw.data;
          console.log(info);
          let addressarray = info.split("");
          addressarray.splice(2, 24);
          contractAddress = addressarray.join("");
          console.log(contractAddress);
        }
      );
      eventPhoto = await reader.result;
      eventDetails = {
        eventname: eventname,
        eventPhoto: eventPhoto,
        contractAddress: contractAddress,
        eventDescription: eventDescription,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        eventLocation: eventLocation,
        eventType: eventType,
        isOnline: isOnline,
        userId: currentUserId,
      };
      // then post data to backend route with axios
      await axios.post("http://localhost:8080/api/create-event", {
        eventDetails: eventDetails,
      });
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
    console.log("submit");
  };
  return (
    <div>
      <div className={classes.formcontainer}>
        <h1 className={classes.title}>Create Event</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label className={classes.label}>Event Photo</Form.Label>
            <div className={classes.fileUploadDiv}>
              <h6 id={classes.formInfo}>
                <center>JPG,PNG,GIF, Max 10mb</center>
              </h6>
              <center>{filename}</center>
              <input
                required
                id="file"
                type="file"
                onChange={(event) => handleFileChange(event)}
              />
              <label className={classes.fileInput} for="file">
                Upload Photo
              </label>
              <img
                className="mt-5"
                id={classes.previewImg}
                src={preview}
                width="400px"
                alt="alt"
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formBasicEventName">
            <Form.Label className={classes.label}>Event Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Event name"
              value={eventname}
              onChange={(event) => setEventName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEventDescription">
            <Form.Label className={classes.label}>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Tell us a bit about your event"
              style={{ height: "100px" }}
              value={eventDescription}
              onChange={(event) => setEventDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEventCat">
            <Form.Label className={classes.label}>Event Category</Form.Label>
            <Form.Group controlId="formCategory">
              <select
                id={classes.eventType}
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
              >
                <option value="none" selected disabled hidden>
                  Select an Option
                </option>
                <option value="concert">Entertainment</option>
                <option value="musical">Cooking</option>
                <option value="seminar">Seminar</option>
                <option value="fitness">Fitness</option>
                <option value="educational">Educational</option>
                <option value="educational">Well-being</option>
                <option value="hobbies">Hobbies</option>
              </select>
            </Form.Group>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formBasicDate">
                <Form.Label className={classes.label}>Event Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  value={eventDate}
                  onChange={(event) => setEventDate(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicLocation">
                <Form.Label className={classes.label}>Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Location"
                  value={eventLocation}
                  onChange={(event) => setEventLocation(event.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicDate">
                <Form.Label className={classes.label}>Start Time</Form.Label>
                <TimePicker
                  value={startTime}
                  start="00:00"
                  end="23:30"
                  step={30}
                  required
                  onChange={(event) => handleStartTime(event)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicLocation">
                <Form.Label className={classes.label}>End Time</Form.Label>
                <TimePicker
                  value={endTime}
                  start="00:00"
                  end="23:30"
                  step={30}
                  required
                  onChange={(event) => handleTimeChange(event)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Online"
              value={isOnline}
              onChange={() => setIsOnline(true)}
            />
          </Form.Group>
          <button variant="primary" type="submit" className={classes.submitBtn}>
            Create Event
          </button>
        </Form>
      </div>
    </div>
  );
};
