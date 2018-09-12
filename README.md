# dPay.js
dPay.js the JavaScript API for dPay blockchain

# Documentation

- [Install](https://github.com/dpays/dpayjs/tree/master/doc#install)
- [Browser](https://github.com/dpays/dpayjs/tree/master/doc#browser)
- [Config](https://github.com/dpays/dpayjs/tree/master/doc#config)
- [Database API](https://github.com/dpays/dpayjs/tree/master/doc#api)
    - [Subscriptions](https://github.com/dpays/dpayjs/tree/master/doc#subscriptions)
    - [Tags](https://github.com/dpays/dpayjs/tree/master/doc#tags)
    - [Blocks and transactions](https://github.com/dpays/dpayjs/tree/master/doc#blocks-and-transactions)
    - [Globals](https://github.com/dpays/dpayjs/tree/master/doc#globals)
    - [Keys](https://github.com/dpays/dpayjs/tree/master/doc#keys)
    - [Accounts](https://github.com/dpays/dpayjs/tree/master/doc#accounts)
    - [Market](https://github.com/dpays/dpayjs/tree/master/doc#market)
    - [Authority / validation](https://github.com/dpays/dpayjs/tree/master/doc#authority--validation)
    - [Votes](https://github.com/dpays/dpayjs/tree/master/doc#votes)
    - [Content](https://github.com/dpays/dpayjs/tree/master/doc#content)
    - [Witnesses](https://github.com/dpays/dpayjs/tree/master/doc#witnesses)
- [Login API](https://github.com/dpays/dpayjs/tree/master/doc#login)
- [Follow API](https://github.com/dpays/dpayjs/tree/master/doc#follow-api)
- [Broadcast API](https://github.com/dpays/dpayjs/tree/master/doc#broadcast-api)
- [Broadcast](https://github.com/dpays/dpayjs/tree/master/doc#broadcast)
- [Auth](https://github.com/dpays/dpayjs/tree/master/doc#auth)


Here is full documentation:
https://github.com/dpays/dpayjs/tree/master/doc

## Browser
```html
<script src="./dpay.min.js"></script>
<script>
dpay.api.getAccounts(['jared', 'michaelx'], function(err, response){
    console.log(err, response);
});
</script>
```

## CDN
https://cdn.benchx.io/lib/latest/dpay.min.js<br/>
```html
<script src="//cdn.benchx.io/lib/latest/dpay.min.js"></script>
```

## Webpack
[Please have a look at the webpack usage example.](https://github.com/dpays/dpayjs/blob/master/examples/webpack-example)

## Server
## Install
```
$ npm install dpayjs --save
```

## RPC Servers
https://greatchain.dpays.io By Default<br/>
https://jackson.dpays.io<br/>
https://jefferson.dpays.io<br/>

## Examples
### Broadcast Vote
```js
var dpay = require('dpayjs');

var wif = dpay.auth.toWif(username, password, 'posting');
dpay.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	console.log(err, result);
});
```

### Get Accounts
```js
dpay.api.getAccounts(['jared', 'michaelx'], function(err, result) {
	console.log(err, result);
});
```

### Get State
```js
dpay.api.getState('/trends/funny', function(err, result) {
	console.log(err, result);
});
```

### Reputation Formatter
```js
var reputation = dpay.formatter.reputation(user.reputation);
console.log(reputation);
```

## Contributions
Patches are welcome! Contributors are listed in the package.json file. Please run the tests before opening a pull request and make sure that you are passing all of them. If you would like to contribute, but don't know what to work on, check the issues list or on dPay Telegram Channel https://t.me/dpayio.

## Issues
When you find issues, please report them!

## License
MIT
