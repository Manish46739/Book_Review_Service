import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private client: Redis | null = null;

  constructor() {
    try {
      this.client = new Redis({
        host: '127.0.0.1',
        port: 6379,
        retryStrategy: () => null, // Disable retry 🔥
      });

      this.client.on('error', (err) => {
        console.warn('⚠️ Redis connection failed:', err.message);
        this.client = null;
      });
    } catch (err) {
      console.warn('⚠️ Redis init error:', err.message);
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.client) return null;
    try {
      return await this.client.get(key);
    } catch (err) {
      console.warn('⚠️ Redis GET failed:', err.message);
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.set(key, value, 'EX', 60);
    } catch (err) {
      console.warn('⚠️ Redis SET failed:', err.message);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.del(key);
    } catch (err) {
      console.warn('⚠️ Redis DEL failed:', err.message);
    }
  }
}
