const path = require('path');
const fs = require('fs');

const solc = require('solc');

const EventContractPath = path.resolve(__dirname, 'contracts', 'CreateEvent.sol');

const source = fs.readFileSync(EventContractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'CreateEvent.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
};



const output = JSON.parse(solc.compile(JSON.stringify(input)));

let bytecode = output.contracts['CreateEvent.sol'].CreateEvent.evm.bytecode.object
let abi = output.contracts['CreateEvent.sol'].CreateEvent.abi
let JSONabi = JSON.stringify(output.contracts['CreateEvent.sol'].CreateEvent.abi)
// console.log(JSONabi)

module.exports = {bytecode, abi}

