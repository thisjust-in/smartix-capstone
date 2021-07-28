const express = require("express");
const { cloudinary } = require("../Cloudinary/cloudinary");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

class PlatformRouter {
  constructor(Method) {
    this.Method = Method;
  }
  router() {
    const router = express.Router();
    router.post("/api/getInfo", this.getInfo.bind(this));
    router.post("/api/walletId", this.addWallet.bind(this));
    router.post("/api/create-event", this.createEvent.bind(this));
    router.get("/api/eventhost", this.getEventHost.bind(this));
    router.post("/api/findId", this.getUserfromAddress.bind(this));
    router.post("/api/findContractAddress", this.getContractAddress.bind(this));
    router.post("/api/getlist", this.setEventList.bind(this));
    router.get("/event/:id", this.getEventInfo.bind(this));
    router.post("/purchase", this.purchase.bind(this));
    router.post("/api/edit-email", this.editEmail.bind(this));
    router.post("/api/edit-username", this.editUsername.bind(this));
    router.post("/api/profile-picture", this.updateProPic.bind(this));
    router.post("/gettix", this.gettix.bind(this));
    router.post("/api/purchase-confirmation", this.sendEmail.bind(this));
    router.post(
      "/api/getallpurchasedevent",
      this.getAllPurchasedEvent.bind(this)
    );
    router.post("/api/findusername", this.findTheUserName.bind(this));
    return router;
  }

  async updateProPic(req, res) {
    let data = req.body;
    let id = data.id;
    let photoStream = req.body.photo;
    const cloudUpload = await cloudinary.uploader.upload(photoStream, {
      upload_preset: "ml_default",
    });
    let jsonFormat = cloudUpload.secure_url.toString();
    let userProfile_pic = jsonFormat;
    await this.Method.setProfilePic(id, userProfile_pic);
    res.send(userProfile_pic);
    res.end();
  }

  async sendEmail(req, res) {
    let email = req.body.email;
    const eventName = req.body.eventinfo.eventName;
    const eventId = req.body.eventinfo.id;
    const venue = req.body.eventinfo.venue;
    const totalAmount = req.body.amount;
    const eventDate = new Date(req.body.eventinfo.eventDate).toDateString();
    const startTime = req.body.eventinfo.startTime;
    const endTime = req.body.eventinfo.endTime;
    const eventTicketURL = `http://localhost:3000/etix/${eventId}`;
    const purchaseDate = new Date();

    // order object
    const order = {
      eventId: eventId,
      eventName: eventName,
      purchaseDate: purchaseDate,
      eventTicketURL: eventTicketURL,
      venue: venue,
      eventDate: eventDate,
      totalAmount: totalAmount,
      startTime: startTime,
      endTime: endTime,
    };
    console.log(order);

    // node mailer syntax
    let smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLEADRESS,
        pass: process.env.GOOGLEPASSWORD,
      },
    });

    const options = {
      viewEngine: {
        partialsDir: __dirname + "/../views/partials",
        layoutsDir: __dirname + "/../views/layouts",
        extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: "views",
    };

    smtpTransport.use("compile", hbs(options));

    try {
      let mailOptions = {
        from: "smartixhk@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: "Thank you for purchasing the ticket!", // Subject line
        template: "orderConfirmation",
        context: order,
      };
      await smtpTransport.sendMail(mailOptions);
      console.log("sent!");
      res.end();
    } catch (error) {
      console.log("error", error);
    }
  }

  async getInfo(req, res) {
    let id = req.body.id;
    let userInfo = await this.Method.getUserInfo(id);
    res.send(userInfo);
    res.end();
  }

  async editUsername(req, res) {
    let id = req.body.submitDetails.id;
    let username = req.body.submitDetails.username;
    await this.Method.setUsername(id, username);
    res.send();
  }

  async getAllPurchasedEvent(req, res) {
    let userId = req.body.userId;
    let purchasedEvent = await this.Method.getAllPurchaseRecord(userId);
    res.send(purchasedEvent);
    res.end();
  }

  async editEmail(req, res) {
    let id = req.body.submitDetails.id;
    let email = req.body.submitDetails.email;
    await this.Method.setEmailAddress(id, email);
    res.end();
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
      res.send(id[0]);
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
    console.log(data);
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

  async gettix(req, res) {
    let wallet_id = req.body.wallet_id;
    let event_id = req.body.event_id;
    let result = await this.Method.getPurchaseRecord(wallet_id, event_id);
    res.send(result);
    res.end();
  }

  async getAllPurchasedEvent(req, res) {
    let userId = req.body.userId;
    let purchasedEvent = await this.Method.getAllPurchaseRecord(userId);
    res.send(purchasedEvent);
    res.end();
  }

  async findTheUserName(req, res) {
    let [user_address] = req.body.userAddress;
    console.log("user_address", user_address);
    let newUserAddress = user_address.toLowerCase();
    let user_name = await this.Method.findUserName(newUserAddress);
    res.send(user_name);
    res.end();
  }
}

module.exports = PlatformRouter;
