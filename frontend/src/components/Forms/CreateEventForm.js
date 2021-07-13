// import React, { useState } from "react";
// import { Form, Row, Col } from "react-bootstrap";
// import classes from "./EventForm.module.css";
// export const EventForm = () => {
//   const [eventname, setEventName] = useState("");
//   const [eventDescription, setEventDescription] = useState("");
//   const [eventLocation, setEventLocation] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [eventType, setEventType] = useState("hello");
//   const [eventCapacity, setEventCapacity] = useState("");
//   const [isOnline, setIsOnline] = useState(false);
//   const [filename, setFileName] = useState("No file selected");
//   const [preview, setPreview] = useState(null);
//   const [inputBox, setInputBox] = useState(0);
//   let formItem = [];

//   for (let i = 0; i < inputBox; i++) {
//     formItem.push(
//       <Row className="g-2">
//         <Col md>
//           <Form.Label className={classes.label}>Token name</Form.Label>
//           <Form.Control type="text" placeholder="First class" />
//         </Col>
//         <Col md>
//           <Form.Label className={classes.label}>Token Quantity</Form.Label>
//           <Form.Control type="number" placeholder="100" />
//         </Col>
//         <Col md>
//           <Form.Label className={classes.label}>Token Price</Form.Label>
//           <Form.Control type="number" placeholder="0.5 Eth" />
//         </Col>
//       </Row>
//     );
//   }

//   // handle image upload to show preview
//   const handleFileChange = (event) => {
//     let info = event.target.files[0];
//     setFileName(info.name);
//     setPreview(URL.createObjectURL(event.target.files[0]));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("submit");
//   };
//   return (
//     <div>
//       <div className={classes.formcontainer}>
//         <h1 className={classes.title}>Create Event</h1>

//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formFileSm" className="mb-3">
//             <Form.Label className={classes.label}>Event Photo</Form.Label>
//             <div className={classes.fileUploadDiv}>
//               <h6 id={classes.formInfo}>
//                 <center>JPG,PNG,GIF, Max 10mb</center>
//               </h6>
//               <p>
//                 <center>{filename}</center>
//               </p>
//               <input
//                 required
//                 id="file"
//                 type="file"
//                 onChange={(event) => handleFileChange(event)}
//               />
//               <label className={classes.fileInput} for="file">
//                 Upload Photo
//               </label>
//               <img
//                 className="mt-5"
//                 id={classes.previewImg}
//                 src={preview}
//                 width="400px"
//               />
//             </div>
//           </Form.Group>
//           <Form.Group controlId="formBasicEventName">
//             <Form.Label className={classes.label}>Event Name</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               placeholder="Event name"
//               value={eventname}
//               onChange={(event) => setEventName(event.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicEventDescription">
//             <Form.Label className={classes.label}>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               placeholder="Tell us a bit about your event"
//               style={{ height: "100px" }}
//               value={eventDescription}
//               onChange={(event) => setEventDescription(event.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicEventName">
//             <Form.Label className={classes.label}>Event Category</Form.Label>
//             <Form.Group controlId="formCategory">
//               <select
//                 id={classes.eventType}
//                 value={eventType}
//                 onChange={(event) => setEventType(event.target.value)}
//               >
//                 <option value="none" selected disabled hidden>
//                   Select an Option
//                 </option>
//                 <option value="concert">Entertainment</option>
//                 <option value="musical">Cooking</option>
//                 <option value="seminar">Seminar</option>
//                 <option value="fitness">Fitness</option>
//                 <option value="educational">Educational</option>
//                 <option value="educational">Well-being</option>
//                 <option value="hobbies">Hobbies</option>
//               </select>
//             </Form.Group>
//           </Form.Group>
//           <Form.Group controlId="formBasicLocation">
//             <Form.Label className={classes.label}>Location</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               placeholder="Location"
//               value={eventLocation}
//             />
//           </Form.Group>
//           <Row>
//             <Col>
//               <Form.Group controlId="formBasicDate">
//                 <Form.Label className={classes.label}>Event Date</Form.Label>
//                 <Form.Control
//                   required
//                   type="date"
//                   value={eventDate}
//                   onChange={(event) => setEventDate(event.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="formBasicEventCapacity">
//                 <Form.Label className={classes.label}>
//                   Event Capacity
//                 </Form.Label>
//                 <Form.Control
//                   required
//                   type="number"
//                   min="0"
//                   value={eventCapacity}
//                   placeholder="Event Capacity"
//                   onChange={(event) => setEventCapacity(event.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Form.Group controlId="formBasicEventName">
//             <Form.Label className={classes.label}>Token Tier</Form.Label>
//             <Form.Control
//               required
//               type="number"
//               min="0"
//               placeholder="Token tier"
//               onChange={(event) => setInputBox(event.target.value)}
//             />
//             {formItem}
//           </Form.Group>
//           <Form.Group controlId="formBasicCheckbox">
//             <Form.Check
//               type="checkbox"
//               label="Online"
//               value={isOnline}
//               onChange={(event) => setIsOnline(true)}
//             />
//           </Form.Group>
//           <button variant="primary" type="submit" className={classes.submitBtn}>
//             Create Event
//           </button>
//         </Form>
//       </div>
//     </div>
//   );
// };
