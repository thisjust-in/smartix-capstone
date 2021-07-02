const express = require("express");

class PlatformRouter {
  constructor(Method) {
    this.Method = Method;
  }
  router() {
    const router = express.Router();
    router.get("/api/hello", this.hello.bind(this));
    router.post("/api/walletId", this.addWallet.bind(this));
    router.get("/api/eventhost", this.getEventHost.bind(this));
    router.post('/api/getlist', this.getEventList.bind(this))
    return router;
  }

  hello(req, res) {
    res.send("hello dllm");
  }

  async addWallet(req, res) {
    let walletId = req.body.wallet_id;
    // console.log("what is wallet id", walletId);
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

  async getEventList(req, res) {
    let location = req.body.location
    let date = req.body.date
    let name = req.body.name
    let data = await this.Method.getEventList(location, event_date_from, event_date_to, name, event_type)
    res.send(data)
    res.end();
  }

}

module.exports = PlatformRouter;