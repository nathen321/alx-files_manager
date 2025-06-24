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
    try {
      this.client.connect();
      return this.client.ping() === 'PONG';
    } catch (error) {
      return false;
    }
  }

  async get(key) {
    try {
      await this.client.connect();
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.log('Redis Client Error', err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.connect();
      await this.client.setEx(key, duration, JSON.stringify(value));
    } catch (err) {
      console.log('Redis Client Error', err);
    }
  }

  async del(key) {
    try {
      await this.client.connect();
      await this.client.del(key);
    } catch (err) {
      console.log('Redis Client Error', err);
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
