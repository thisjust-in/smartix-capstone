import { useDispatch } from "react-redux";
import { addWalletThunk } from "../redux/MetaMaskSlice";

function MetaMaskBtn() {
  const dispatch = useDispatch();
  const addWallet = (wallet_id) => dispatch(addWalletThunk(wallet_id));

  async function click() {
    if (!window.ethereum) {
      window.alert("install metamask");
    } else {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      addWallet(account);
    }
  }

  return (
    <div>
      <button onClick={click}>Enable Ethereum</button>
    </div>
  );
}

export default MetaMaskBtn;
