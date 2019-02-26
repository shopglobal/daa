var http = require("http");
var request = require("request-promise");

function TradeOgre(tradeData,method) {
    // constructor() {
        // globalize 
        // authentication information
        this.API_KEY = tradeData.username ? tradeData.username : '';
                const API_KEY = this.API_KEY;
        this.API_SECRET = tradeData.password ? tradeData.password : '';
                const API_SECRET = this.API_SECRET;
        // global URL
        let URL;
        const GET = "GET";
        const POST = "POST";     
        // secure socket layer
        const secureLayer = 'https://';
        // sell API path
        // Submit Sell Order
        // Method (POST)
        // /order/sell
        // POST Fields
        // market quantity price
        // Submit a sell order to the order book for a market. The success status will be false if there is an error, and error will contain the error message. Your available buy and sell balance for the market will be returned if successful. If your order is successful but not fully fulfilled, the order is placed onto the order book and you will receive a uuid for the order.
        const sellApi = 'tradeogre.com/api/v1/order/sell';
        // buy API path
        // Submit Buy Order
        // Method (POST)
        // /order/buy
        // POST Fields
        // market quantity price
        // Submit a buy order to the order book for a market. The success status will be false if there is an error, and error will contain the error message. Your available buy and sell balance for the market will be returned if successful. If your order is successful but not fully fulfilled, the order is placed onto the order book and you will receive a uuid for the order.
        const buyApi = 'tradeogre.com/api/v1/order/buy';
        // cancel API path
        // Cancel Order
        // Method (POST)
        // /order/cancel
        // POST Fields
        // uuid
        // Cancel an order on the order book based on the order uuid. The uuid parameter can also be set to all and all of your orders will be cancelled across all markets.
        const cancelApi = 'tradeogre.com/api/v1/order/cancel';
        // account orders API path
        // Get Orders
        // Method (POST)
        // /account/orders
        // POST Fields
        // market
        // Retrieve the active orders under your account. The market field is optional, and leaving it out will return all orders in every market. date is a Unix UTC timestamp.
        const accountsApi = 'tradeogre.com/api/v1/account/orders';
        // account balances API path 
        // Get Balance
        // Method (POST)
        // /account/balance
        // POST Fields
        // currency
        // Get the balance of a specific currency for you account. The currency field is required, such as BTC. The total balance is returned and the available balance is what can be used in orders or withdrawn.
        const coinBalanceApi = 'tradeogre.com/api/v1/account/balance';
        // account balances API path 
        // Get Balances
        // Method (GET)
        // /account/balances
        // Retrieve all balances for your account.
        const balancesApi = 'tradeogre.com/api/v1/account/balances';
        // list markets API path
        // List Markets
        // Method (GET)
        // /markets
        // Retrieve a listing of all markets and basic information including current price, volume, high, low, bid and ask.
        const marketsApi = 'tradeogre.com/api/v1/markets';
        // list order book API path
        // Get Order Book
        // Method (GET)
        // /orders/{market}
        // Retrieve the current order book for {market} such as BTC-ETNX.
        const ordersApi = 'tradeogre.com/api/v1/orders/';
        // specific order lookup 
        // Get Order
        // Method (GET)
        // /account/order/{uuid}
        // Retrieve information about a specific order by the uuid of the order. date is a Unix UTC timestamp.
        const orderApi = 'tradeogre.com/api/v1/account/order/';
        // market trade history 
        // Get Trade History
        // Method (GET)
        // /history/{market}
        // Retrieve the history of the last trades on {market} limited to 100 of the most recent trades. The date is a Unix UTC timestamp.
        const historyApi = 'tradeogre.com/api/v1/history/';
        // market ticker history 
        // Get Ticker
        // Method (GET)
        // /ticker/{market}
        // Retrieve the ticker for {market}, volume, high, and low are in the last 24 hours, initialprice is the price from 24 hours ago.
        const tickerApi = 'tradeogre.com/api/v1/ticker/';
    
        // users trade data
        this.tradeData = tradeData;

        // trade method
        this.method = method ? method : tradeData.method;

        // corresponding trade URL based on method
        this.tradeAPIurl = this.method==='account' ? accountsApi : this.method==='buy' ? buyApi : this.method==='sell' ? sellApi : this.method==='cancel' ? cancelApi : this.method==='orders' ? ordersApi : this.method==='order_details' ? orderApi : this.method==='markets' ? marketsApi : this.method==='balances' ? balancesApi : this.method==='coin_balance' ? coinBalanceApi : this.method==='ticker' ? tickerApi : this.method==='history' ? historyApi : '';
                const tradeAPIurl = this.tradeAPIurl;

        // corresponding trade URL based on method
        this.type = this.method==='account' ? POST : this.method==='buy' ? POST : this.method==='sell' ? POST : this.method==='cancel' ? POST : this.method==='orders' ? GET : this.method==='order_details' ? GET : this.method==='markets' ? GET : this.method==='balances' ? GET : this.method==='coin_balance' ? POST : this.method==='ticker' ? GET : this.method==='history' ? GET : '';
                const type = this.type;

        // establish query based on method type
        this.query = type===POST ? "POST" : type===GET ? "GET" : '';
                const query = this.query;

        // market uuid 
        this.uuid = tradeData.uuid ? tradeData.uuid : '';
                const uuid = this.uuid;

        // market order quantity 
        this.quantity = tradeData.quantity ? tradeData.quantity : '';
                const quantity = this.quantity;

        // market order price 
        this.rate = tradeData.price ? tradeData.price : '';
                const rate = this.rate;

        // market order ticker 
        this.market = tradeData.market ? tradeData.market : '';
                const market = this.market;
    // }
// flexible post function provides, all available methods
this.toApi = function(tradeData,method) {

    var form = {};
    form.uuid = tradeData.uuid;
    form.method = this.method ? this.method :'';
    form.market = tradeData.market;
    form.currency = tradeData.market;
    form.quantity = tradeData.quantity;
    form.price = tradeData.price;

    // hook in market option
    const marketOption = this.market;
    // establish market / coin 
    this.marketTicker = tradeData.market ? tradeData.market : '';
    const marketTicker = this.marketTicker;

    // confirm the uuid 
    this.order_uuid = this.uuid ? uuid : tradeData.uuid; 
    const order_uuid = this.order_uuid; 

    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+tradeAPIurl;

    if(this.method ==='buy'|| this.method ==='sell'|| this.method ==='cancel'){
        URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+tradeAPIurl;console.log(URL);
    }
    if(this.method ==='order_details'){
        URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+tradeAPIurl+order_uuid;console.log(URL);
    }
    if(this.method ==='orders'||this.method ==='ticker'){
        URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+tradeAPIurl+marketTicker;console.log(URL);
    }


    // if(this.query!=''){console.log(this.query+"\n")}else{console.log("no query"+"\n")};
    // if(this.tradeData!=''){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    // if(this.API_KEY!=''){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    // if(this.API_SECRET!=''){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    // if(this.method!=''){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    // if(this.uuid!=''){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    // if(this.username!=''){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    // if(this.password!=''){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    // if(this.quantity!=''){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    // if(this.rate!=''){console.log(this.rate+"  \n")}else{console.log("no rate"+"\n")};
    // if(this.market!=''){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    // if(this.tradeAPIurl!=''){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: query,
  form
}, function(error, response, body) {
  // console.log(body);
});
};



// List Markets
// Method (GET)
// /markets
// Retrieve a listing of all markets and basic information including current price, volume, high, low, bid and ask.
// Example Response:
// [{"BTC-AEON":{"initialprice":"0.00022004","price":"0.00025992","high":"0.00025992","low":"0.00022003","volume":"0.00359066","bid":"0.00022456","ask":"0.00025993"}},{"BTC-BTCP":{"initialprice":"0.00300573","price":"0.00325000","high":"0.00379000","low":"0.00300010","volume":"0.04753022","bid":"0.00300099","ask":"0.00325000"}},{"BTC-BTN":{"initialprice":"0.00000032","price":"0.00000033","high":"0.00000033","low":"0.00000028","volume":"0.01306734","bid":"0.00000027","ask":"0.00000033"}},{"BTC-CIV":{"initialprice":"0.00032127","price":"0.00026700","high":"0.00032127","low":"0.00026700","volume":"0.73182101","bid":"0.00026700","ask":"0.00029000"}},{"BTC-COAL":{"initialprice":"0.00000289","price":"0.00000330","high":"0.00000330","low":"0.00000288","volume":"0.00297381","bid":"0.00000289","ask":"0.00000345"}},{"BTC-DASH":{"initialprice":"0.04699999","price":"0.05757790","high":"0.05757790","low":"0.04699999","volume":"0.00322117","bid":"0.04880001","ask":"0.05757750"}},{"BTC-DNR":{"initialprice":"0.00027742","price":"0.00027743","high":"0.00027743","low":"0.00027742","volume":"0.00078309"}},{"BTC-DOGE":{"initialprice":"0.00000041","price":"0.00000041","high":"0.00000041","low":"0.00000039","volume":"0.23236572","bid":"0.00000040","ask":"0.00000041"}},{"BTC-ETN":{"initialprice":"0.00000352","price":"0.00000338","high":"0.00000352","low":"0.00000319","volume":"2.50156282","bid":"0.00000328","ask":"0.00000337"}},{"BTC-FBF":{"initialprice":"0.00000002","price":"0.00000002","high":"0.00000002","low":"0.00000002","volume":"0.00020160"}},{"BTC-GRFT":{"initialprice":"0.00000307","price":"0.00000317","high":"0.00000336","low":"0.00000296","volume":"5.66677757","bid":"0.00000317","ask":"0.00000318"}},{"BTC-IPBC":{"initialprice":"0.00001874","price":"0.00001995","high":"0.00001995","low":"0.00001711","volume":"0.13150579","bid":"0.00001875","ask":"0.00001996"}},{"BTC-IRD":{"initialprice":"0.00000380","price":"0.00000310","high":"0.00000396","low":"0.00000310","volume":"0.07091748","bid":"0.00000310","ask":"0.00000337"}},{"BTC-ITNS":{"initialprice":"0.00000057","price":"0.00000053","high":"0.00000057","low":"0.00000049","volume":"0.01109704","bid":"0.00000053","ask":"0.00000055"}},{"BTC-KRB":{"initialprice":"0.00006215","price":"0.00006900","high":"0.00006900","low":"0.00005001","volume":"0.00205379","bid":"0.00006900","ask":"0.00007195"}},{"BTC-LTC":{"initialprice":"0.01905000","price":"0.01922345","high":"0.01922994","low":"0.01832040","volume":"0.38355349","bid":"0.01878022","ask":"0.01922343"}},{"BTC-LUX":{"initialprice":"0.00065505","price":"0.00065505","high":"0.00065505","low":"0.00065505","volume":"0.00069824","bid":"0.00071401","ask":"0.00075971"}},{"BTC-NAH":{"initialprice":"0.00000204","price":"0.00000202","high":"0.00000204","low":"0.00000202","volume":"0.05168677","bid":"0.00000202","ask":"0.00000380"}},{"BTC-NBR":{"initialprice":"0.00000066","price":"0.00000066","high":"0.00000070","low":"0.00000052","volume":"0.02534533","bid":"0.00000058","ask":"0.00000066"}},{"BTC-PCN":{"initialprice":"0.00000001","price":"0.00000001","high":"0.00000001","low":"0.00000001","volume":"0.00088627","bid":"0.00000000","ask":"0.00000001"}},{"BTC-PLURA":{"initialprice":"0.00000025","price":"0.00000030","high":"0.00000041","low":"0.00000023","volume":"0.39319767","bid":"0.00000030","ask":"0.00000033"}},{"BTC-SUMO":{"initialprice":"0.00017004","price":"0.00017007","high":"0.00017007","low":"0.00017004","volume":"0.00245623","bid":"0.00017008","ask":"0.00019994"}},{"BTC-TRTL":{"initialprice":"0.00000001","price":"0.00000001","high":"0.00000002","low":"0.00000001","volume":"0.42322449","bid":"0.00000001","ask":"0.00000002"}},{"BTC-WAE":{"initialprice":"0.00000017","price":"0.00000013","high":"0.00000018","low":"0.00000012","volume":"0.01046213","bid":"0.00000013","ask":"0.00000017"}},{"BTC-XAO":{"initialprice":"0.00000090","price":"0.00000095","high":"0.00000100","low":"0.00000090","volume":"0.00177852","bid":"0.00000095","ask":"0.00000100"}},{"BTC-XMR":{"initialprice":"0.02502002","price":"0.02500000","high":"0.03102001","low":"0.02500000","volume":"0.15549958","bid":"0.02420000","ask":"0.02625000"}},{"BTC-XTL":{"initialprice":"0.00000004","price":"0.00000004","high":"0.00000004","low":"0.00000003","volume":"0.40128073","bid":"0.00000003","ask":"0.00000004"}},{"BTC-XUN":{"initialprice":"0.00000024","price":"0.00000024","high":"0.00000030","low":"0.00000021","volume":"0.01266742","bid":"0.00000024","ask":"0.00000028"}},{"BTC-XVG":{"initialprice":"0.00000449","price":"0.00000498","high":"0.00000510","low":"0.00000385","volume":"0.07170363","bid":"0.00000426","ask":"0.00000497"}}]
this.toApiMarkets = function(tradeData) {

    var form = {};
    // establish method 
    this.method='markets';
    form.uuid = tradeData.uuid;
    form.method = this.method;
    // hook API based on method
    this.marketsAPIurl = this.method==='markets' ? marketsApi : '';
    const marketsAPIurl = this.marketsAPIurl;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+marketsAPIurl;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "GET",
  form
}, function(error, response, body) {
  // console.log(body);
});
};


// buy API path
// Submit Buy Order
// Method (POST)
// /order/buy
// POST Fields
// market quantity price
// Submit a buy order to the order book for a market. The success status will be false if there is an error, and error will contain the error message. Your available buy and sell balance for the market will be returned if successful. If your order is successful but not fully fulfilled, the order is placed onto the order book and you will receive a uuid for the order.
this.toApiBuy = function(tradeData) {

    var form = {};
    // establish method 
    this.method='buy';
    form.uuid = tradeData.uuid;
    form.method = this.method ? this.method :'';
    form.market = tradeData.market;
    form.quantity = tradeData.quantity;
    form.price = tradeData.price;
    // hook API based on method
    this.buyAPIurl = this.method==='buy' ? buyApi : '';
    const buyAPIurl = this.buyAPIurl;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+buyAPIurl;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "POST",
  form
}, function(error, response, body) {
  // console.log(body);
});
};

// sell API path
// Submit Sell Order
// Method (POST)
// /order/sell
// POST Fields
// market quantity price
// Submit a sell order to the order book for a market. The success status will be false if there is an error, and error will contain the error message. Your available buy and sell balance for the market will be returned if successful. If your order is successful but not fully fulfilled, the order is placed onto the order book and you will receive a uuid for the order.
this.toApiSell = function(tradeData) {

    var form = {};
    // establish method 
    this.method='sell';
    form.uuid = tradeData.uuid;
    form.method = this.method ? this.method :'';
    form.market = tradeData.market;
    form.quantity = tradeData.quantity;
    form.price = tradeData.price;
    // hook API based on method
    this.sellAPIurl = this.method==='sell' ? sellApi : '';
    const sellAPIurl = this.sellAPIurl;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+sellAPIurl;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "POST",
  form
}, function(error, response, body) {
  // console.log(body);
});
};


// cancel API path
// Cancel Order
// Method (POST)
// /order/cancel
// POST Fields
// uuid
// Cancel an order on the order book based on the order uuid. The uuid parameter can also be set to all and all of your orders will be cancelled across all markets.
this.toApiCancel = function(tradeData) {

    var form = {};
    // establish method 
    this.method='cancel';
    form.uuid = tradeData.uuid;
    form.method = this.method;
    // hook API based on method
    this.cancelAPIurl = this.method==='cancel' ? cancelApi : '';
    const cancelAPIurl = this.cancelAPIurl;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+cancelAPIurl;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "POST",
  form
}, function(error, response, body) {
  // console.log(body);
});
};



// account orders API path
// Get Orders
// Method (POST)
// /account/orders
// POST Fields
// market
// Retrieve the active orders under your account. The market field is optional, and leaving it out will return all orders in every market. date is a Unix UTC timestamp.
this.toApiAccountsOrders = function(tradeData) {

    var form = {};
    // establish method 
    this.method='account';
    form.market = tradeData.market;
    form.method = this.method;
    // hook API based on method
    this.accountsAPIurl = this.method==='account' ? accountsApi : '';
    const accountsAPIurl = this.accountsAPIurl;
    // hook in market option
    const marketOption = tradeData.market;
    // establish a secure url

    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+accountsAPIurl;
    console.log(URL)
    if(this.market != ''){
        URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+accountsAPIurl+"/"+marketOption;
    }

    if(this.query!=''){console.log(this.query+"\n")}else{console.log("no query"+"\n")};
    if(this.tradeData!=''){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY!=''){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET!=''){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method!=''){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid!=''){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username!=''){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password!=''){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity!=''){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate!=''){console.log(this.rate+"  \n")}else{console.log("no rate"+"\n")};
    if(this.market!=''){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl!=''){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "POST",
  form
}, function(error, response, body) {
  // console.log(body);
});
};

// specific order lookup 
// Get Order
// Method (GET)
// /account/order/{uuid}
// Retrieve information about a specific order by the uuid of the order. date is a Unix UTC timestamp.
this.toApiAccountsOrdersDetails = function(tradeData) {

    var form = {};
    // establish method 
    this.method='order_details';
    form.uuid = tradeData.uuid;
    form.method = this.method;
    // hook API based on method
    this.orderDetailsAPIurl = this.method==='order_details' ? orderApi : '';
    const orderDetailsAPIurl = this.orderDetailsAPIurl;
    // confirm the uuid 
    this.order_uuid = this.uuid ? uuid : tradeData.uuid; 
    const order_uuid = this.order_uuid; 
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+orderDetailsAPIurl+order_uuid;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "GET",
  form
}, function(error, response, body) {
  // console.log(body);
});
};


// account balances API path 
// Get Balances
// Method (GET)
// /account/balances
// Retrieve all balances for your account.
this.toApiAccountsBalances = function(tradeData) {

    var form = {};
    // establish method 
    this.method='balances';
    form.uuid = tradeData.uuid;
    form.method = this.method;
    // hook API based on method
    this.accountsBalancesAPIurl = this.method==='balances' ? balancesApi : '';
    const accountsBalancesAPIurl = this.accountsBalancesAPIurl;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+accountsBalancesAPIurl;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "GET",
  form
}, function(error, response, body) {
  // console.log(body);
});
};

// account balances API path 
// Get Balance
// Method (POST)
// /account/balance
// POST Fields
// currency
// Get the balance of a specific currency for you account. The currency field is required, such as BTC. The total balance is returned and the available balance is what can be used in orders or withdrawn.
this.toApiAccountsCoinsBalance = function(tradeData) {

    var form = {};
    // establish method 
    this.method='coin_balance';
    form.currency = tradeData.market;
    form.method = this.method;
    // hook API based on method
    this.coinBalanceAPIurl = this.method==='coin_balance' ? coinBalanceApi : '';
    const coinBalanceAPIurl = this.coinBalanceAPIurl;
    // establish market / coin 
    this.marketTicker = tradeData.market ? tradeData.market : '';
    const marketTicker = this.marketTicker;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+coinBalanceAPIurl+marketTicker;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "POST",
  form
}, function(error, response, body) {
  // console.log(body);
});
};

// Method (GET)
// /orders/{market}
// Retrieve the current order book for {market} such as BTC-XMR.
// Example Response
// {"success":true,"buy":{"0.02425501":"36.46986607","0.02425502":"93.64201137","0.02425503":"19.02000000","0.02425504":"101.68086403","0.02425505":"29.57700547","0.02425506":"104.61014094","0.02425507":"142.23464863","0.02425508":"25.31886131","0.02425509":"79.46064443","0.02425510":"76.22400000","0.02425511":"49.31800000","0.02425512":"23.67600000","0.02425513":"3.26463919","0.02425514":"78.16971446","0.02425515":"115.49000000"},"sell":{"0.02427176":"737.34633975","0.02427232":"94.30483300","0.02427233":"278.29200000","0.02427234":"662.39516500","0.02427235":"947.71751090","0.02427236":"2527.89139301","0.02427237":"0.15080884","0.02427475":"0.16884703","0.02427580":"0.02597142","0.02427658":"2.12366600","0.02427659":"89.02183300","0.02427660":"83.20000000","0.02427799":"9.34148978","0.02427800":"4.19982028","0.02427940":"0.46177255","0.02427941":"98.87243165","0.02427942":"479.11100000"}}
this.toApiOrderBook = function(tradeData) {

    var form = {};
    // establish method 
    this.method='orders';
    form.uuid = tradeData.uuid;
    form.method = this.method;
    form.market = tradeData.market;
    // hook API based on method
    this.ordersAPIurl = this.method==='orders' ? ordersApi : '';
    const ordersAPIurl = this.ordersAPIurl;
    // establish market / coin 
    this.marketTicker = tradeData.market ? tradeData.market : '';
    const marketTicker = this.marketTicker;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+ordersAPIurl+marketTicker;
    console.log(URL)
    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "GET",
  form
}, function(error, response, body) {
  // console.log(body);
});
};

// Get Ticker
// Method (GET)
// /ticker/{market}
// Retrieve the ticker for {market}, volume, high, and low are in the last 24 hours, initialprice is the price from 24 hours ago.
// Example Response
// {"success":true,"initialprice":"0.02502002","price":"0.02500000","high":"0.03102001","low":"0.02500000","volume":"0.15549958","bid":"0.02420000","ask":"0.02625000"}
this.toApiMarketTicker = function(tradeData) {

    var form = {};
    // establish method 
    this.method='ticker';
    form.uuid = tradeData.uuid;
    form.method = this.method;
    form.market = tradeData.market;
    // hook API based on method
    this.tickerAPIurl = this.method==='ticker' ? tickerApi : '';
    const tickerAPIurl = this.tickerAPIurl;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+tickerAPIurl+marketTicker;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "GET",
  form
}, function(error, response, body) {
  // console.log(body);
});
};

// Get Trade History
// Method (GET)
// /history/{market}
// Retrieve the history of the last trades on {market} limited to 100 of the most recent trades. The date is a Unix UTC timestamp.
// Example Response
// [{"date":1515128233,"type":"sell","price":"0.02454320","quantity":"0.17614230"},{"date":1515128233,"type":"sell","price":"0.02454181","quantity":"0.11651065"},{"date":1515128233,"type":"sell","price":"0.02453774","quantity":"11.37791774"},{"date":1515128235,"type":"sell","price":"0.02453774","quantity":"52.62616027"},{"date":1515128235,"type":"sell","price":"0.02453774","quantity":"0.39786743"},{"date":1515128253,"type":"sell","price":"0.02453774","quantity":"0.12844529"},{"date":1515128253,"type":"sell","price":"0.02453774","quantity":"7.89600000"},{"date":1515128253,"type":"sell","price":"0.02453774","quantity":"24.21560927"},{"date":1515128253,"type":"sell","price":"0.02453759","quantity":"0.25618000"},{"date":1515128253,"type":"sell","price":"0.02453660","quantity":"3.07034916"},{"date":1515128253,"type":"sell","price":"0.02453660","quantity":"5.66611628"},{"date":1515128254,"type":"sell","price":"0.02453660","quantity":"0.28166838"},{"date":1515128255,"type":"sell","price":"0.02453660","quantity":"1.00000000"},{"date":1515128271,"type":"sell","price":"0.02453660","quantity":"2.98866618"},{"date":1515128271,"type":"sell","price":"0.02453660","quantity":"38.26919550"},{"date":1515128271,"type":"sell","price":"0.02453660","quantity":"3.85000000"}]
this.toApiMarketTradeHistory = function(tradeData) {

    var form = {};
    // establish method 
    this.method='history';
    form.uuid = tradeData.uuid;
    form.market = tradeData.market;
    form.method = this.method;
    // hook API based on method
    this.historyAPIurl = this.method==='history' ? historyApi : '';
    const historyAPIurl = this.historyAPIurl;
    // establish a secure url
    URL = secureLayer + tradeData.username + ":" + tradeData.password + "@"+historyAPIurl+marketTicker;

    if(this.tradeData){console.log(this.tradeData)}else{console.log("no tradeData"+"\n")};
    if(this.API_KEY){console.log(this.API_KEY+"\n")}else{console.log("no API_KEY"+"\n")};
    if(this.API_SECRET){console.log(this.API_SECRET+"\n")}else{console.log("no API_SECRET"+"\n")};
    if(this.method){console.log(this.method+"\n")}else{console.log("no method"+"\n")};
    if(this.uuid){console.log(this.uuid+"\n")}else{console.log("no uuid"+"\n")};
    if(this.username){console.log(this.username+"\n")}else{console.log("no username"+"\n")};
    if(this.password){console.log(this.password+"\n")}else{console.log("no password"+"\n")};
    if(this.quantity){console.log(this.quantity+"\n")}else{console.log("no quantity"+"\n")};
    if(this.rate){console.log(this.rate+"\n")}else{console.log("no rate"+"\n")};
    if(this.market){console.log(this.market+"\n")}else{console.log("no market"+"\n")};
    if(this.tradeAPIurl){console.log(this.tradeAPIurl+"\n")}else{console.log("no tradeAPIurl"+"\n")};

    if (!tradeData.username||!tradeData.password) {console.log("Missing API Key"); return false}
    return request({
  uri: URL,
  method: "GET",
  form
}, function(error, response, body) {
  // console.log(body);
});
};





};

module.exports = TradeOgre;