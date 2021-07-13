import web3 from './web3'



const address = '0xD8c13fB8e161637655eFB3ED0aD953407Df0802b';

const abi = [
  {
    inputs: [ [Object], [Object] ],
    name: 'Mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x0f6798a5'
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'TixPrice',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x2f97800d'
  },
  {
    inputs: [ [Object], [Object], [Object] ],
    name: 'TixQty',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x2632af9c'
  },
  {
    inputs: [ [Object], [Object], [Object] ],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    constant: undefined,
    payable: true,
    signature: '0xe3e5c2b9'
  },
  {
    inputs: [ [Object] ],
    name: 'contracts',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x474da79a'
  },
  {
    inputs: [],
    name: 'eventID',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x9716bff5'
  },
  {
    inputs: [ [Object] ],
    name: 'eventLog',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x77d5a223'
  },
  {
    inputs: [],
    name: 'getContractCount',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x9399869d'
  },
  {
    inputs: [],
    name: 'newEvent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x691db8f1'
  },
  {
    inputs: [ [Object], [Object], [Object] ],
    name: 'setPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x3011e16a'
  }
]



export default new web3.eth.Contract(abi, address)