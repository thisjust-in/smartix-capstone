import React from "react";
import EventContract from "../EventContract";
import { useEffect } from "react";
import web3 from "../web3";

function Test() {
 
    let ContractCount
    useEffect(async () => {
        const accounts = await web3.eth.getAccounts();
        ContractCount = await EventContract.methods.getContractCount().send({from: accounts[0]})
    }, [])


    async function click() {
        const accounts = await web3.eth.getAccounts();
        let createEvent = await EventContract.methods.newEvent().send({from: accounts[0]})
        console.log(createEvent)

    }

  return (
    <div>
     <button onClick={click}>Create Contract</button>
     <p>{ContractCount} ttt</p>
    </div>
  );
}

export default Test;