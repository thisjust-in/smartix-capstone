const express = require("express");

class PlatformRouter {
  constructor(Method) {
    this.Method = Method;
  }
  router() {
    const router = express.Router();
    router.post("/api/walletId", this.addWallet.bind(this));
    router.get("/api/eventhost", this.getEventHost.bind(this));
    return router;
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
}

module.exports = PlatformRouter;
