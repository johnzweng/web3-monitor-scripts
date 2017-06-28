var BigNumber = require('bignumber.js');


function balanceChanged(web3, startBlock, endBlock, maxDiff, address) {
    if (!web3.isAddress(address)) {
        throw "No valid address";
    }
    var balanceNow = web3.eth.getBalance(address, endBlock);
    var balanceBefore = web3.eth.getBalance(address, startBlock);
    console.log('DEBUG: BEFORE: ' + web3.fromWei(balanceBefore, 'ether'));
    console.log('DEBUG: NOW:    ' + web3.fromWei(balanceNow, 'ether'));
    var diff = balanceNow.sub(balanceBefore);

    // if balance changed more then maxDiff in either direction:
    if (diff.abs().gt(maxDiff)) {
        console.log('WARNING: balance has CHANGED by ' + web3.fromWei(diff, 'ether'));
        return true;
    } else {
        return false;
    }
}


/**
 * Iterates over addresses, check for changes. TODO WIP
 *
 * @param web3
 * @param startBlock
 * @param endBlock
 * @param maxDiff
 * @param addressList array of objects {name: , address: }
 */
exports.checkBalanceChanges = function (web3, startBlock, endBlock, maxDiff, addressList) {
    var changed = false;
    addressList.forEach(function (elem) {
        console.log('DEBUG: ------------------------------------');
        console.log('DEBUG: checking ' + elem.name);
        if (balanceChanged(web3, startBlock, endBlock, maxDiff, elem.address)) {
            changed = true;
        }
        console.log('DEBUG: ------------------------------------');
    });
    return changed;
};
