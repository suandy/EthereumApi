/*******************************************************************************
*                                   Dependencies                               *
*******************************************************************************/
var express = require('express');
var bodyParser = require('body-parser');
var contract = require("truffle-contract");
var path = require('path');
var contractJSON = require(path.join(__dirname, '../build/contracts/EthereumApi.json'));
var Web3 = require('web3');
var utils = require('web3-utils');
var Personal = require('web3-eth-personal');

/*******************************************************************************
*                                   Web3                                       *
*******************************************************************************/
var devProvider = "http://0.0.0.0:8545";
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}
else {
    web3 = new Web3(new Web3.providers.HttpProvider(devProvider));
}

/*******************************************************************************
*                                   Variables                                  *
*******************************************************************************/
var file_hash,
    receiver,
    sender,
    transaction_hash,
    personal = new Personal(Personal.givenProvider || devProvider);

/*******************************************************************************
*                                   Contract                                   *
*******************************************************************************/
var contract = contract(contractJSON);
contract.setProvider(new Web3.providers.HttpProvider(devProvider));
if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function () {
        return contract.currentProvider.send.apply(
            contract.currentProvider, arguments
        );
    };
}

/*******************************************************************************
*                                   Express                                    *
*******************************************************************************/
var router = express.Router();

/*******************************************************************************
*                                   Routes                                     *
*******************************************************************************/


router.get('/create', function (req, res) {
    contract.deployed().then(function () {
        // Should modify the password
        return personal.newAccount('password');
    }).then(function (account) {
        personal.unlockAccount(account, 'password');
        console.log(account);
        res.json({ account });
    }).catch(function (e) {
        console.log(e);
    });
});

router.post('/balance', function (req, res) {
    var balance_address = req.body.address;

    contract.deployed().then(function () {
        return web3.fromWei(web3.eth.getBalance(balance_address));
    }).then(function (balance) {
        console.log(balance);
        res.json({ balance });
    }).catch(function (e) {
         console.log(e);
    });
});

router.post('/receipt', function (req, res) {
    var transaction_hash = req.body.transaction;

    contract.deployed().then(function () {
        return receipt = web3.eth.getTransactionReceipt(transaction_hash);
    }).then(function (receipt) {
        console.log(receipt);
        res.json({ receipt });
    }).catch(function (e) {
        console.log(e);
    });
});

router.post('/transfer', function (req, res) {
    receiver = req.body.receiver;
    sender = req.body.sender;
    amount = utils.toWei(req.body.amount, 'ether');

    var gas = '21000';
    var gasPrice = web3.eth.gasPrice;

    contract.deployed().then(function () {
        return web3.eth.sendTransaction(
            {
                from: sender,
                to: receiver,
                value: amount,
                gas: gas,
                gasPrice: gasPrice
            }
        );
    }).then(function (transaction_hash) {
        console.log(transaction_hash);
        res.json({ transaction_hash });
    }).catch(function (e) {
        console.log(e);
    });
});

router.post('/estimate', function (req, res) {
    file_hash = req.body.hash;
    receiver = req.body.receiver;
    sender = req.body.sender;

    var gas = '21000';
    var gasPrice = web3.eth.gasPrice;
    var gasTotal = gasPrice.mul(gas);
    var totalValue = web3.eth.getBalance(sender).sub(gasTotal);

    contract.deployed().then(function (instance) {
        return instance.notarize.estimateGas(sender, receiver, file_hash, { 
            from: sender,
            to: receiver,
        });
    }).then(function (cost) {
        var etherCost = utils.fromWei(new utils.BN(gasTotal.plus(cost).toString()), 'ether');
        console.log(etherCost);
        res.json({ etherCost });
    }).catch(function (e) {
        console.log(e);
    });
});

/*******************************************************************************
*                                   Router                                     *
*******************************************************************************/
module.exports = router;