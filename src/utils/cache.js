const NodeCache = require('node-cache');
// stdTTL: 600 means the data lives for 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

module.exports = cache;