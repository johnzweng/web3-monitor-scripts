var BigNumber = require('bignumber.js');
var monitor = require('./monitor-balance-change');
var Web3 = require('web3');
var web3;

//
// addresses we try to watch for balance changes
//
var addressesToMonitor = [
    {
        name: 'Cofound.it Wallet',
        address: '0x3fec3c6e014e28566000a1be3cfcb43327d4b743'
    },
    {
        name: 'tenX Wallet',
        address: '0x185f19b43d818e10a31be68f445ef8edcb8afb83'
    }
    // TODO add more..
];

//
// threshold balance changed amount in eth
// (we will warn if balance goes up or down more than this amount)
//
var maxDiffInEth = 100;

//
// comparing current balance with this time in past
//
var diffPeriodInDays = 7;




// create Web3 instance
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // local geth node
    //web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    // Infura.io public node:
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io:443'));
}

// warn if balance changed more than this amount
var maxBalanceDiff = new BigNumber(web3.toWei(maxDiffInEth, 'ether'));


var endBlock = web3.eth.blockNumber;
// current block minus 1 week at 1 block every 16 secs
var startBlock = endBlock - Math.floor(diffPeriodInDays * 24 * 3600 / 16);

//
// Actually check the balances..
//
monitor.checkBalanceChanges(web3,startBlock,endBlock, maxBalanceDiff, addressesToMonitor);




