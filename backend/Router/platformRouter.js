const express = require("express");

class PlatformRouter {
  constructor(Method) {
    this.Method = Method;
  }
  router() {
    const router = express.Router();
    router.post("/api/walletId", this.addWallet.bind(this));
    router.get("/api/eventhost", this.getEventHost.bind(this));
    router.post("/api/getlist", this.setEventList.bind(this));
    router.get("/event/:id", this.getEventInfo.bind(this))
    return router;
  }

  async addWallet(req, res) {
    let walletId = req.body.wallet_id;
    await this.Method.storeWalletId(walletId).then(() => {
      console.log("inserted id");
    });
    res.end();
  }

  async getEventHost(req, res) {
    await this.Method.getEventHost().then((data) => {
      res.send(data);
    });
    res.end();
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
    let id = req.params.id
    let data = await this.Method.getEventInfo(id)
    res.send(data)
  }

}

module.exports = PlatformRouter;
