import { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

interface RateLimitResponse {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const LIMIT = 100; // requests
const WINDOW = 60 * 1000; // 1 minute in milliseconds

export async function rateLimit(
  request: NextRequest,
  limit: number = LIMIT,
  window: number = WINDOW
): Promise<RateLimitResponse> {
  try {
    const ip = request.ip || '127.0.0.1';
    const key = `rate-limit:${ip}`;
    const now = Date.now();
    const windowStart = now - window;

    // In a real app, use Redis or another store
    // This is a simple in-memory implementation
    const store = new Map<string, number[]>();
    
    // Get existing timestamps for this IP
    const timestamps = store.get(key) || [];
    
    // Filter out old timestamps
    const validTimestamps = timestamps.filter(ts => ts > windowStart);
    
    // Add current timestamp
    validTimestamps.push(now);
    
    // Update store
    store.set(key, validTimestamps);
    
    const remaining = Math.max(0, limit - validTimestamps.length);
    const reset = Math.ceil((windowStart + window * 2) / 1000);
    
    return {
      success: remaining > 0,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Default to success if rate limiting fails
    return {
      success: true,
      limit,
      remaining: limit,
      reset: Math.ceil((Date.now() + window) / 1000),
    };
  }
}