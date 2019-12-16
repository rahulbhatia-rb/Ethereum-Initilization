const HDwalletprovider =  require('truffle-hdwallet-provider')
const Web3= require('web3')
//const web3=new Web3();

const {interface,bytecode} =  require('./compile')
const provider =  new HDwalletprovider('file spatial grow visit wish enemy oyster young win news girl forget','https://rinkeby.infura.io/v3/b66825151ab3405093e47675111aa09c');

const web3=new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts() ;

// deploys the contract onto the Ganache Ethereum network
// Contract is a constructor and is used to make the Web 3 know about what all functions are there in the Smart Contract
// Deploy function is used to deploy the contract onto web3
// Send is used to send the Ether(Gas price) in order to make a transaction
console.log("Deploying from the Ethreum Account",accounts[0])
result = await new web3.eth.Contract(JSON.parse(interface))
.deploy({data:bytecode, arguments:['Hello ji there']})
.send({from: accounts[0], gas:1000000})

console.log("Contract is deployed to",result.options.address)

};
deploy();