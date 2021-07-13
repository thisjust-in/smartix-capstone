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
        //0x91079e71DFC318b7dF17229991d6245b585014e5 (without gas)
        //0x23936F08CbC1c0d5FBf40978dBb37F97c62A8d80
        //0xD8c13fB8e161637655eFB3ED0aD953407Df0802b (latest without gas)
};
deploy();