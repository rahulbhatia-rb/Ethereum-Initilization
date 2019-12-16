const assert=require('assert');
const ganache = require('ganache-cli');
const Web3 =  require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile')
/*
class Car
{
    park()
    {
        return 'stopped';
    }
    drive()
    {
        return 'vroom';
    }

}

let car;
beforeEach(() => {
car= new Car();
});
describe('Car',()=> {
    

it('can park',()=>{
assert.equal(car.park(),'stopped');

});
it('can drive',()=>
{
assert.equal(car.drive(),'vroom');
});
}
);

*/


let accounts;
let inbox;

beforeEach ( async () =>{
// get a list of all acounts;

// to Fetch the account Id's use then()
accounts = await web3.eth.getAccounts() ;

// deploys the contract onto the Ganache Ethereum network
// Contract is a constructor and is used to make the Web 3 know about what all functions are there in the Smart Contract
// Deploy function is used to deploy the contract onto web3
// Send is used to send the Ether(Gas price) in order to make a transaction
inbox = await new web3.eth.Contract(JSON.parse(interface))
.deploy({data:bytecode, arguments:['Hi there']})
.send({from: accounts[0], gas:1000000})
});

describe('Inbox',()=>{
it('Accounts is credited with the particular transaction',() => {
    //checking if the contract is deployed or not
    //console.log(inbox);
    //checking where the account has transacted or not
    assert.ok(inbox.options.address)

});
it('has a default message', async () =>{

   //message function paranthesis is used to pass arguments and cal function is used to call and execute the message function 
const message = await inbox.methods.message().call();
assert.equal(message,'Hi there')

});
it('updating a new message',async () =>
{
await inbox.methods.setMessage('Hello from the other side').send({from:accounts[0],gas:1000000});
const message = await inbox.methods.message().call();
assert.equal(message,'Hello from the other side')
});

});