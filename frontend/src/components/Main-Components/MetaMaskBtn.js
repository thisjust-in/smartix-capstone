import { useDispatch } from "react-redux";
import { addWalletThunk } from "../../redux/MetaMaskSlice";
import styles from "./PrimaryBtn.module.css";
import { useHistory } from "react-router-dom";

function MetaMaskBtn() {
  const history = useHistory();
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
      history.go(0);
    }
  }

  return (
    <div>
      <button className={styles.button} onClick={click}>
        Login/Signup
      </button>
    </div>
  );
}

export default MetaMaskBtn;
