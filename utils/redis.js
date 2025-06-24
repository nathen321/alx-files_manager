import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.connected = false;
    this.client.on('connect', () => {
      this.connected = true;
    });
    this.client.on('error', (err) => {
      this.connected = false;
      console.error('Redis error:', err);
    });
    this.client.connect().catch(console.error);
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    if (!this.connected) return null;
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error('Get error:', err);
      return null;
    }
  }

  async set(key, value, duration) {
    if (!this.connected) return false;
    try {
      await this.client.setEx(key, duration, value);
      return true;
    } catch (err) {
      console.error('Set error:', err);
      return false;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
