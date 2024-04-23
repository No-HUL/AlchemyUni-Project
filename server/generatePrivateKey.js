import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);
const address = "0x"+ toHex(keccak256(publicKey).slice(-10));
console.log(toHex(privateKey),toHex(publicKey),address);