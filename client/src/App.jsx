import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const privateKeyToAddress = {
  "df0e34ea598a8f6590b4237d313c3cb159a4c41bb02ff513fa06235d0ea65da5": "0x872dd3bfd7d75a483a20",
  "038ae1a8c24572e223e71360f0e73ae8a303f6fc575e530e51c7cf835b3c529f": "0xfc31b600ca8f467209f1",
  "3f02c94d527348b2519cad0185d2196cc5dcafb92073a724bf200d5b5e4a68ee": "0xafba4c5a9fd2123b11db"
};

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        privateKeyToAddress={privateKeyToAddress}
      />
      <Transfer 
        setBalance={setBalance}
        address={address}
        privateKey={privateKey}
       />
    </div>
  );
}

export default App;
