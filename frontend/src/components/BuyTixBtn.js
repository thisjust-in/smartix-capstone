import Web3 from 'web3'

async function loadContract(){

return await new window.web3.eth.Contract()

}

function BuyTixBtn() {
  return (
    <div>
    <button onClick={loadContract}>Buy Tix</button>
    </div>
)}

export default BuyTixBtn;
