const express = require("express");
const { cloudinary } = require("../Cloudinary/cloudinary");

class PlatformRouter {
  constructor(Method) {
    this.Method = Method;
  }
  router() {
    const router = express.Router();
    router.post("/api/walletId", this.addWallet.bind(this));
    router.post("/api/create-event", this.createEvent.bind(this));
    router.get("/api/eventhost", this.getEventHost.bind(this));
    router.post("/api/findId", this.getUserfromAddress.bind(this));
    router.post("/api/findContractAddress", this.getContractAddress.bind(this));
    router.post("/api/getlist", this.setEventList.bind(this));
    router.get("/event/:id", this.getEventInfo.bind(this));
    router.post("/purchase", this.purchase.bind(this));
    router.post("/api/edit-email", this.editEmail.bind(this));
    return router;
  }

  async editEmail(req, res) {
    let email = req.body.email;
    let emailAddress = await this.Method.setEmailAddress(id, email);
    res.send(emailAddress);
  }

  async addWallet(req, res) {
    let walletId = req.body.wallet_id;
    console.log(walletId);
    await this.Method.storeWalletId(walletId).then(() => {
      console.log("inserted id");
    });
    res.end();
  }

  async getUserfromAddress(req, res) {
    let formatAddress = req.body.id[0].toLowerCase();
    let userID = await this.Method.getUserfromAddress(formatAddress);
    if (userID) {
      res.send(userID.toString());
      res.end();
    } else {
      let id = await this.Method.storeWalletId(formatAddress);
      res.send(id[0].toString());
      res.end();
    }
  }

  async getContractAddress(req, res) {
    let user_Id = req.body.id;
    let contractAddress = await this.Method.findContractAddress(user_Id);
    res.send(contractAddress);
    res.end();
  }

  async getEventHost(req, res) {
    await this.Method.getEventHost().then((data) => {
      res.send(data);
    });
    res.end();
  }

  async createEvent(req, res) {
    try {
      console.log("Running");
      let data = req.body;
      // first upload to cloudinary
      let photoStream = data.eventDetails.eventPhoto;
      const cloudUpload = await cloudinary.uploader.upload(photoStream, {
        upload_preset: "ml_default",
      });
      let jsonFormat = JSON.stringify(cloudUpload.secure_url.toString());
      // then assign it return url to eventPhoto
      let eventName = data.eventDetails.eventname;
      let eventLocation = data.eventDetails.eventLocation;
      let eventPhoto = jsonFormat;
      let venue = data.eventDetails.venue;
      let eventDate = data.eventDetails.eventDate;
      let startTime = data.eventDetails.startTime;
      let endTime = data.eventDetails.endTime;
      let eventDescription = data.eventDetails.eventDescription;
      let contractAddress = data.eventDetails.contractAddress;
      let eventCapacity = 1000;
      let eventType = data.eventDetails.eventType;
      let isOnline = data.eventDetails.isOnline;
      let user_id = data.eventDetails.userId;
      console.log(isOnline);
      await this.Method.createEvent(
        eventName,
        contractAddress,
        eventLocation,
        eventPhoto,
        eventDescription,
        eventDate,
        startTime,
        endTime,
        eventCapacity,
        venue,
        eventType,
        isOnline,
        user_id
      );
      res.end();
    } catch (error) {
      console.log("error", error);
    }
  }

  async setEventList(req, res) {
    let location = req.body.location;
    let date = req.body.date;
    let query = req.body.name;
    let data = await this.Method.getEventList(location, date, query);
    res.send(data);
    res.end();
  }

  async getEventInfo(req, res) {
    let id = req.params.id;
    let data = await this.Method.getEventInfo(id);
    res.send(data);
  }

  async purchase(req, res) {
    let TixDetails = JSON.stringify(req.body.TixDetails);
    let wallet_id = req.body.wallet_id;
    let contractAddress = req.body.contractAddress;
    await this.Method.purchaseRecord(TixDetails, wallet_id, contractAddress);
    res.end();
  }
}

module.exports = PlatformRouter;
