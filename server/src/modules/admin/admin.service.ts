import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getStats() {
    // Example placeholder. Replace with real stats later.
    return {
      totalUsers: 0,
      activeUsers: 0,
      emailVerifiedUsers: 0,
      timestamp: new Date().toISOString(),
    };
  }
}
