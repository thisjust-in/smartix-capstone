const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');

const {
    abi,
    bytecode
} = require('./compile')

const provider = new HDWalletProvider(
    'exit smile mirror second torch tube dignity increase paper cherry grit yard',
    'https://rinkeby.infura.io/v3/8504011b675b45a7a007a80dcc20a8fb'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    let contractAddress = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode
        })
        .send({
            from: accounts[0]
        })
        console.log(contractAddress.options.address)
        console.log(abi)
        
};
deploy();