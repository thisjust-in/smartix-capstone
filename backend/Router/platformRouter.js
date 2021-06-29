const express = require("express");

class PlatformRouter {
  constructor(Method) {
    this.Method = Method;
  }
  router() {
    const router = express.Router();
    router.get("/api/hello", this.hello.bind(this));
    router.post("/api/walletId", this.addWallet.bind(this));
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
}

module.exports = PlatformRouter;
