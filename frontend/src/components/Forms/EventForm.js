import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import classes from "./EventForm.module.css";
export const EventForm = () => {
  const [eventname, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("hello");
  const [filename, setFileName] = useState("No file selected");
  const [preview, setPreview] = useState(null);

  // handle image upload to show preview
  const handleFileChange = (event) => {
    let info = event.target.files[0];
    setFileName(info.name);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
              <p>
                <center>{filename}</center>
              </p>
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
          <Form.Group controlId="formBasicEventName">
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
          <Form.Group controlId="formBasicDate">
            <Form.Label className={classes.label}>Event Date</Form.Label>
            <Form.Control
              required
              type="date"
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
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
