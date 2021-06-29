import Web3 from 'web3'

async function click(){
  if(!window.ethereum){
    window.alert('install metamask')
  } else {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(accounts)
  }
}

function MetaMaskBtn() {
  return (
    <div>
    <button onClick={click}>Enable Ethereum</button>
    </div>
)}

export default MetaMaskBtn;
