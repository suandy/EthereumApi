# Ethereum API


## Setup
Using `docker`, you can run with the command
```
docker-compose up
```
Running locally, you will need to install all the required package defined in the `package.json` with the following command
```
npm install
```
and then run with
```
npm run dev
```
if you plan on working with the dev environment. You can set up your own script in the `package.json` file under the section `scripts`

## Calls
You must make sure all POST calls are in the form of `x-www-form-urlencoded`.

## API
`/balance` : Get the balance of the given address
* address : the public hash address 

`/transfer` : Make a transfer between addresses
* receiver: the public hash address of the receiver
* sender: the public hash address of the giver
* amount: the amount to send/receive

`/create` : Create a new address. Can receive ether and send if the address has enough fund.

`/receipt` : Get the transaction info of a specific transaction.
* transaction: the transaction hash. The hash is usually generated after a transaction.

`/estimate` : Obtain an estimate of the cost of a transaction.
* receiver: the public hash address of the receiver
* sender: the public hash address of the giver
* hash: the hash to send to the blockchain. 
