import mongodb from 'mongodb';

/**
 * Represents a mongo client.
 */
class DBClient {
  /**
   * Creates a new MongoClient instance.
   */
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.client = new mongodb.MongoClient(`mongodb://${dbHost}:${dbPort}/${database}`, { useUnifiedTopology: true });
    this.connected = false;
    this.client.connect()
      .then(() => {
        this.connected = true;
      })
      .catch(() => {
        this.connected = false;
      });
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.connected;
  }

  /**
   * Retrieves the nbUsers of a given key.
   */
  async nbUsers() {
    const db = this.client.db();
    return db.collection('users').countDocuments();
  }

  /**
   * Retrieves the nbFiles of a given key.
   */
  async nbFiles() {
    const db = this.client.db();
    return db.collection('files').countDocuments();
  }
}

export const dbClient = new DBClient();
export default dbClient;
