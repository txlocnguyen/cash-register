function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let change = [];
    const CURRENCY_UNIT = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 60,
        "ONE HUNDRED": 100
    }
    let sortedCid = cid.filter(el => el[1] !== 0).reverse();
    let totalCid = 0;
    sortedCid.forEach(el => totalCid += el[1]);
    if (totalCid < changeDue) {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: []
        };
    } else if (totalCid === changeDue) {
        return {
            status: "CLOSED",
            change: cid
        };
    } else {
        sortedCid.forEach(el => {
            let currencyName = el[0];
            let amountInCid = el[1];
            let result = [currencyName, 0];
            while (changeDue >= CURRENCY_UNIT[currencyName] && amountInCid > 0) {
                amountInCid -= CURRENCY_UNIT[currencyName];
                changeDue -= CURRENCY_UNIT[currencyName];
                changeDue = changeDue.toFixed(2);
                result[1] += CURRENCY_UNIT[currencyName];
            }
            if (result[1] > 0) {
                change.push(result);
            }
        })
        if (changeDue > 0) {
            return {
                status: "INSUFFICIENT_FUNDS",
                change: []
            };
        }
        return {
            status: "OPEN",
            change: change
        };
    }
}