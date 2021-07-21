const express = require("express");
const {
  cloudinary
} = require("../Cloudinary/cloudinary");

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
    router.post("/api/getlist", this.setEventList.bind(this));
    router.get("/event/:id", this.getEventInfo.bind(this));
    router.post('/purchase', this.purchase.bind(this))
    return router;
  }

  async addWallet(req, res) {
    let walletId = req.body.wallet_id;
    await this.Method.storeWalletId(walletId).then(() => {
      console.log("inserted id");
    });
    res.end();
  }

  async getUserfromAddress(req, res) {
    let user_id = req.body.id[0];
    let formatAddress = user_id.toString().toLowerCase();
    let userID = await this.Method.getUserfromAddress(formatAddress);
    res.send(userID.toString());
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
      let eventDate = data.eventDetails.eventDate;
      let startTime = data.eventDetails.startTime;
      let endTime = data.eventDetails.endTime;
      let eventDescription = data.eventDetails.eventDescription;
      let contractAddress = data.eventDetails.contractAddress;
      let eventCapacity = 0;
      let eventType = data.eventDetails.eventType;
      let isOnline = data.eventDetails.isOnline;
      let user_id = data.eventDetails.userId;
      // console.log(data);
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
        eventType,
        isOnline,
        user_id
      );
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
    let TixDetails = JSON.stringify(req.body.TixDetails)
    let wallet_id = req.body.wallet_id
    let contractAddress = req.body.contractAddress
    await this.Method.purchaseRecord(TixDetails, wallet_id, contractAddress)
  }

}

module.exports = PlatformRouter;