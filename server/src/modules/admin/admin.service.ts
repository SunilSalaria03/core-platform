// Admin service
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getStats() {
    return {
      totalUsers: 0,
      activeUsers: 0,
      emailVerifiedUsers: 0,
      timestamp: new Date().toISOString(),
    };
  }
}
