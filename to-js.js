// var http = require("http");
var TradeOgre = require("./to-this");

// sys argvs
const user0 = process.argv[0];//node
const user1 = process.argv[1];//path-to-my-js
// usable program argvs
const user2 = process.argv[2];//first argv
const user3 = process.argv[3];//second argv
const user4 = process.argv[4];//third argv
const user5 = process.argv[5];//fourth argv

// arguments test
// var userActions = function(){
//     console.log(user0);
//     console.log(user1);
//     console.log(user2);
//     console.log(user3);
//     console.log(user4);
//     console.log(user5);
// };
// userActions(); 

const API_KEY = '';
const API_SECRET = '';

var method = user2 ? user2 : '';
const uuid = user3 ? user3 : '';
const marketTicker = user3 ? user3 : '';
const orderQuantity = user4 ? user4 : '6.66';
const marketPrice = user5 ? user5 : '0.00002001';
let bid = 0;
let ask = 0;
let price = 0;
let min = 0;
let max = 0;
this.rand = function getRndInteger(min, max) {
  return parseFloat(Math.random() * (max - min) + min).toFixed(8);
};
const rand = this.rand;
this.spread = function buySellSpread(min, max) {
  return parseFloat(rand(bid,ask)).toFixed(8);
};
const spread = this.spread;
this.satoshiPercent = function satoshiPercent(price) {
  return parseFloat(price*0.0005).toFixed(8);
};
const satoshiPercent = this.satoshiPercent;
this.satoshiOnePercent = function satoshiOnePercent(price) {
  return parseFloat(price*0.001).toFixed(8);
};
const satoshiOnePercent = this.satoshiOnePercent;
this.satoshiTwoPercent = function satoshiTwoPercent(price) {
  return parseFloat(price*0.002).toFixed(8);
};
const satoshiTwoPercent = this.satoshiTwoPercent;
this.satoshiFivePercent = function satoshiFivePercent(price) {
  return parseFloat(price*0.0025).toFixed(8);
};
const satoshiFivePercent = this.satoshiFivePercent;
this.satoshiTenPercent = function satoshiTenPercent(price) {
  return parseFloat(price*0.0035).toFixed(8);
};
const satoshiTenPercent = this.satoshiTenPercent;
this.halfPercent = function halfPercent(price) {
  return parseFloat(price*0.005).toFixed(8);
};
const halfPercent = this.halfPercent;
this.onePercent = function onePercent(price) {
  return parseFloat(price*0.01).toFixed(8);
};
const onePercent = this.onePercent;
this.oneHalfPercent = function oneHalfPercent(price) {
  return parseFloat(price*0.015).toFixed(8);
};
const oneHalfPercent = this.oneHalfPercent;
this.twoPercent = function twoPercent(price) {
  return parseFloat(price*0.02).toFixed(8);
};
const twoPercent = this.twoPercent;
this.threePercent = function threePercent(price) {
  return parseFloat(price*0.03).toFixed(8);
};
const threePercent = this.threePercent;
this.fivePercent = function fivePercent(price) {
  return parseFloat(price*0.05).toFixed(8);
};
const fivePercent = this.fivePercent;
this.tenPercent = function tenPercent(price) {
  return parseFloat(price*0.10).toFixed(8);
};;
const tenPercent = this.tenPercent;
this.fifteenPercent = function fifteenPercent(price) {
  return parseFloat(price*0.15).toFixed(8);
};
const fifteenPercent = this.fifteenPercent;
this.twentyPercent = function twentyPercent(price) {
  return parseFloat(price*0.20).toFixed(8);
};
const twentyPercent = this.twentyPercent;
this.twentyFivePercent = function twentyFivePercent(price) {
  return parseFloat(price*0.25).toFixed(8);
};
const twentyFivePercent = this.twentyFivePercent;
this.thirtyPercent = function thirtyPercent(price) {
  return arseFloat(price*0.30).toFixed(8);
};
const thirtyPercent = this.thirtyPercent;
this.fourtyPercent = function fourtyPercent(price) {
  return parseFloat(price*0.40).toFixed(8);
};
const fourtyPercent = this.fourtyPercent;
this.fiftyPercent = function fiftyPercent(price) {
  return parseFloat(price*0.50).toFixed(8);
};
const fiftyPercent = this.fiftyPercent;

let tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: marketTicker,
    quantity: parseFloat(orderQuantity),
    price: parseFloat(marketPrice)
};
global.tradeData = tradeData;
this.tradeData = global.tradeData;

var TO = new TradeOgre(tradeData);
console.log('method: '+method);

 let pollETNXTicker = function(){

        tradeData.method = 'ticker';
        tradeData.market = 'BTC-ETNX';
        tradeData.quantity = parseFloat(rand(3300.10301990,7300.10301990));
        
        TO.toApi(tradeData,method).then((result) => {

        let theParse = JSON.parse(result);
        if(result){
            
            bid = parseFloat(theParse.bid);
            ask = parseFloat(theParse.ask);
            price = parseFloat(theParse.price);
            console.log(satoshiFivePercent(price))
            tradeData.price = spread();
            console.log(spread())
            console.log(price)
            console.log(tradeData)
            console.log(theParse)
        }        
        // { success: true,
        //   initialprice: '0.00002102',
        //   price: '0.00002001',
        //   high: '0.00002401',
        //   low: '0.00002001',
        //   volume: '2.41009239',
        //   bid: '0.00002001',
        //   ask: '0.00002057' }
        
        var data = JSON.parse(result);
});
}

setInterval(pollETNXTicker, 250, 'checked');
//     TO.toApi(tradeData,method).then((result) => {

//         let theParse = JSON.parse(result);

//         if(method==="orders"){
//             status = theParse.success;
//             buy = theParse.buy;
//             sell = theParse.sell;
//             console.log(theParse.success)
//             console.log(theParse.buy)
//             console.log(theParse.sell)
//         }

        

//         // { success: true,
//         //   initialprice: '0.00002102',
//         //   price: '0.00002001',
//         //   high: '0.00002401',
//         //   low: '0.00002001',
//         //   volume: '2.41009239',
//         //   bid: '0.00002001',
//         //   ask: '0.00002057' }
//         console.log(theParse)
//         // triggerBuyOrder()
//         var data = JSON.parse(result);
        
//         var coins;
//         // for(i=0;i<=result.length;i++){
//         //     console.log(result[i])
//         // }
//         // console.log(data)
// });
//



let dance = function(){

    function getRndInteger(min, max) {
  return (Math.random() * (max - min) + min).toFixed(8);
}

    let dumpAgain = function(){

    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(3300.10301990,7300.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
console.log(result);
});
    }

    let cancelDumper = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX"
};
    TO.toApi(tradeData,method).then((result) => {
        dumpAgain()
console.log(result);
});
    }

    let liquidTrigger = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(421.10301990,650.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
        cancelDumper()
console.log(result);
});
    }
    let dumperOrder = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(3300.10301990,7300.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
        liquidTrigger()
console.log(result);
});
    }
    let buyBack = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(600.10301990,800.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
console.log(result);
});
    }
    let trapSalesOrder = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(600.10301990,800.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
        buyBack()
        dumperOrder()
console.log(result);
});
    }
    let layAnotherBuy = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(4.10301990,8.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
        trapSalesOrder()
console.log(result);
});
    }
    let triggerSalesOrder = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(4.10301990,8.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
        layAnotherBuy()
console.log(result);
});
    }
    let triggerBuyOrder = function(){
        
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(4.10301990,8.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
        triggerSalesOrder()
console.log(result);
});
    }

// start trading
    const tradeData = {
    username: API_KEY,
    password: API_SECRET,
    uuid: uuid,
    method: method,
    market: "BTC-ETNX",
    quantity: parseFloat(getRndInteger(4.10301990,8.10301990)),
    price: parseFloat(marketPrice)
};
    TO.toApi(tradeData,method).then((result) => {
        triggerBuyOrder()
console.log(result);
});
}


// TO.toApi(tradeData,method).then((result) => {
// console.log(result);
// });

// TO.toApiAccountsOrders(tradeData).then((result) => {
// console.log(result);
// });


// TO.toApiBuy(tradeData).then((result) => {
// console.log(result);
// });

// TO.toApiSell(tradeData).then((result) => {
// console.log(result);
// });

// TO.toApiCancel(tradeData).then((result) => {
// console.log(result);
// });

// TO.toApiOrders(tradeData).then((result) => {
// console.log(result);
// });

