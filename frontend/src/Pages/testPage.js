import React from "react";
import EventContract from "../EventContract";
import web3 from "../web3";
function Test() {
  async function click() {
    let accounts = await web3.eth.getAccounts();
    await EventContract.methods.newEvent().send({ from: accounts[0] });
    await EventContract.getPastEvents(
      "allEvents",
      { fromBlock: "latest", toBlock: "latest" },
      (err, events) => {
        console.log(events[0].raw.data);
        let addressarray = events[0].raw.data.split("");
        addressarray.splice(2, 24);
        console.log(addressarray.join(""));
      }
    );
  }

  return (
    <div>
      <button onClick={click}>Create Contract</button>
    </div>
  );
}

export default Test;
