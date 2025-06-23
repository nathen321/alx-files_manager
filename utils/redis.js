const redis = require('redis');

// Create a client
const client = redis.createClient({
  url: 'redis://localhost:6379',
});

module.exports = client;
