import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    }).on('error', (error) => {
      console.log(error);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = this.client.get(key);
    return value;
  }

  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
