import express from 'express';
const app = express();
import cors from 'cors';
const port = 3042;
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes } from "ethereum-cryptography/utils.js";
import { hexToBytes } from "ethereum-cryptography/utils.js";

app.use(cors());
app.use(express.json());

const balances = {
    "0x872dd3bfd7d75a483a20": {
      "privateKey": "df0e34ea598a8f6590b4237d313c3cb159a4c41bb02ff513fa06235d0ea65da5",
      "publicKey":"0253947cd83bc68b4319077cad4fa86e377d9b50027eebf2c9b97f4f9225c35fee",
      "balance": 100
    },
    "0xfc31b600ca8f467209f1": {
      "privateKey": "038ae1a8c24572e223e71360f0e73ae8a303f6fc575e530e51c7cf835b3c529f",
      "publicKey":"021c55a335f3d8c9763cb273eee9eb7d3550120c66ba58df523b8d77fb0b60ccd4",
      "balance": 50
    },
    "0xafba4c5a9fd2123b11db": {
      "privateKey": "3f02c94d527348b2519cad0185d2196cc5dcafb92073a724bf200d5b5e4a68ee",
      "publicKey":"0269712cd54d5ecf7e86559fcf539135c9667404108f3345ac666988b4fe92deed",
      "balance": 75
    }
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address]?.balance;
  if(balance === undefined){
    res.status(404).send({message: "Address don't have balance"});
  }else{
    res.send({ balance });
  }
});

app.post("/send", (req, res) => {
  const { senderAddress, recipientAddress, transferAmount, txSignature } = req.body;

  setInitialBalance(senderAddress);
  setInitialBalance(recipientAddress);

  const txData = { senderAddress, recipientAddress, transferAmount };
  console.log("txData:",txData);//
  const txHash = keccak256(utf8ToBytes(JSON.stringify(txData)));
  console.log("txHash:",txHash);//
  console.log(balances[senderAddress]);//
  const isSigned = secp256k1.verify(txSignature,txHash,hexToBytes(balances[senderAddress].publicKey));

  if(isSigned){
    if(balances[senderAddress].balance < transferAmount){
      res.status(400).send({message: "Insufficient funds"});
    }
    else {
      balances[senderAddress].balance -= transferAmount;
      balances[recipientAddress].balance += transferAmount;
    }
  }else {
    res.status(400).send({message: "Invalid signature"});
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}