import { useState } from "react";
import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { hexToBytes } from "ethereum-cryptography/utils.js";
import { bytesToHex as toHex } from "ethereum-cryptography/utils.js";
import { utf8ToBytes } from "ethereum-cryptography/utils.js";

function Transfer({ address, setBalance, privateKey }) {
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientAddress, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();//阻止提交表单默认状态的行为

    const txData = {
      senderAddress: address,
      recipientAddress,
      transferAmount: parseInt(transferAmount),
    };

    const txHash = keccak256(utf8ToBytes(JSON.stringify(txData)));
    const txSignature = secp256k1.sign(txHash, hexToBytes(privateKey));
    txData.txSignature = txSignature;

    try {
      const {
        data: { balance },
      } = await server.post(`transfer`, txData);
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={transferAmount}
          onChange={setValue(setTransferAmount)}
        ></input>
      </label>

      <label>
        Recipient Address
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipientAddress}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;