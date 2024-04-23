import server from "./server";

function Wallet({ privateKey, address, setPrivateKey, setAddress, balance, setBalance, privateKeyToAddress }) {
  async function onChangeAddress(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  async function onChangePrivateKey(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    if (privateKey) {
      const address = privateKeyToAddress[privateKey];
      if(address){
        const{data:{balance}} = await server.get(`balance/${address}`);
        setAddress(address);
        setBalance(balance);
      }else {
        setBalance(0);
        setAddress("N/A");
      }
    } else {
      setBalance(0);
      setAddress("");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        {privateKey ? 
          (<div className='balance'>Address:{address}</div>) :
          (<input placeholder="Type an address" value={address} onChange={onChangeAddress} />)
        }
      </label>

      <label>
        Private Key
        {privateKeyToAddress[privateKey] ? 
          (<div className='balance'>Can't show you my private key, even you are my GF</div>) :
          (<input placeholder="Paste your private key here, then you can send transaction." 
          value={privateKey} onChange={onChangePrivateKey} />)
        }
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
