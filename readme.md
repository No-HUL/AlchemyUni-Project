## ECDSA Node

新实现功能：(new features)
* 前端输入私钥后自动显示地址并且立即隐藏私钥(Will show address and hide private key after entering it on the frontend)
* 只有输入私钥后才能进行转账操作
* 验证数字签名后转账
* 可用地址：
  1. 0x872dd3bfd7d75a483a20: 
      privateKey:df0e34ea598a8f6590b4237d313c3cb159a4c41bb02ff513fa06235d0ea65da5,
      publicKey:0253947cd83bc68b4319077cad4fa86e377d9b50027eebf2c9b97f4f9225c35fee,
      balance: 100
  2. 0xfc31b600ca8f467209f1:
      privateKey:038ae1a8c24572e223e71360f0e73ae8a303f6fc575e530e51c7cf835b3c529f,
      publicKey:021c55a335f3d8c9763cb273eee9eb7d3550120c66ba58df523b8d77fb0b60ccd4,
      balance: 50
  3. 0xafba4c5a9fd2123b11db: 
      privateKey:3f02c94d527348b2519cad0185d2196cc5dcafb92073a724bf200d5b5e4a68ee,
      publicKey:0269712cd54d5ecf7e86559fcf539135c9667404108f3345ac666988b4fe92deed,
      balance: 75

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
