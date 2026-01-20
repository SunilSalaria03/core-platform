import { Injectable } from '@nestjs/common';
import { createHash, createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class CommonUtilsService {
  private readonly encryptionKey: string;
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'someSuperSecretValue123';
    this.key = createHash('sha256')
      .update(this.encryptionKey)
      .digest();
    this.iv = Buffer.alloc(16, 0);
  }

  /**
   * Encrypt an email address
   */
  encrypt(email: string): string {
    const normalized = (email || '').trim().toLowerCase();
    const cipher = createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(normalized, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  /**
   * Decrypt an encrypted email address
   */
  decrypt(encryptedEmail: string): string {
    try {
      if (!/^[0-9a-fA-F]+$/.test(encryptedEmail)) return encryptedEmail;
      if (encryptedEmail.length % 2 !== 0 || encryptedEmail.length < 32) return encryptedEmail;

      const decipher = createDecipheriv('aes-256-cbc', this.key, this.iv);
      let decrypted = decipher.update(encryptedEmail, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch {
      return encryptedEmail;
    }
  }

  /**
   * Generate a random number string of specified length
   */
  generateRandomNumbers(length: number): string {
    const digits = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
  }

  /**
   * Generate OTP with expiry time
   */
  generateOtp(): { otp: string; expiryTime: number } {
    const otp = this.generateRandomNumbers(6);
    const expiryTime = Date.now() + 1000 * 60 * 5; // 5 minutes
    return { otp, expiryTime };
  }

  /**
   * Normalize service areas data
   */
  normalizeServiceAreas(rawServiceAreas?: unknown[]): { countryCode: string; stateCode: string; cityName: string; zipCode?: string; location: { type: string; coordinates: [number, number] } }[] | undefined {
    if (!Array.isArray(rawServiceAreas) || rawServiceAreas.length === 0) {
      return undefined;
    }

    const normalized = rawServiceAreas
      .map((area) => {
        if (!area || typeof area !== 'object') return null;

        // Safely access properties
        const location = (area as { location?: { coordinates?: [number, number] } }).location;
        let coordinatesSource: [number, number] | undefined;

        if (location && Array.isArray(location.coordinates) && location.coordinates.length >= 2) {
          coordinatesSource = location.coordinates;
        } else if (
          typeof (area as { longitude?: number }).longitude !== 'undefined' &&
          typeof (area as { latitude?: number }).latitude !== 'undefined'
        ) {
          const longitude = (area as { longitude?: number }).longitude;
          const latitude = (area as { latitude?: number }).latitude;
          if (
            typeof longitude === 'number' &&
            typeof latitude === 'number'
          ) {
            coordinatesSource = [longitude, latitude];
          } else {
            coordinatesSource = undefined;
          }
        }

        if (!Array.isArray(coordinatesSource) || coordinatesSource.length < 2) {
          return null;
        }

        const longitude = this.toNumber(coordinatesSource[0]);
        const latitude = this.toNumber(coordinatesSource[1]);

        if (longitude === null || latitude === null) return null;

        const normalizedArea: { countryCode: string; stateCode: string; cityName: string; zipCode?: string; location: { type: string; coordinates: [number, number] } } = {
          countryCode: (area as { countryCode?: string }).countryCode?.trim()?.toUpperCase() ?? '',
          stateCode: (area as { stateCode?: string }).stateCode?.trim()?.toUpperCase() ?? '',
          cityName: (area as { cityName?: string }).cityName?.trim() ?? '',
          location: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        };

        const zipCode = (area as { zipCode?: string }).zipCode?.trim();
        if (zipCode) {
          normalizedArea.zipCode = zipCode;
        }

        return normalizedArea;
      })
      .filter((area): area is { countryCode: string; stateCode: string; cityName: string; zipCode?: string; location: { type: string; coordinates: [number, number] } } => Boolean(area));

    return normalized.length > 0 ? normalized : undefined;
  }

  /**
   * Check if a date is expired
   */
  isDateExpired(date?: string | Date): boolean {
    if (!date) return true;

    const now = new Date();
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    const target = new Date(date);
    const targetUTC = new Date(
      Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate())
    );

    return targetUTC < todayUTC;
  }

  /**
   * Get days until expiry
   */
  getDaysUntilExpiry(date?: string | Date): number | null {
    if (!date) return null;

    const today = new Date();
    const todayUTC = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );

    const target = new Date(date);
    const targetUTC = Date.UTC(
      target.getUTCFullYear(),
      target.getUTCMonth(),
      target.getUTCDate()
    );

    return Math.ceil((targetUTC - todayUTC) / (1000 * 60 * 60 * 24));
  }

  /**
   * Build notification message for document expiry
   */
  buildNotificationMessage(docName: string, daysLeft: number): { title: string; body: string } {
    if (daysLeft === 0) {
      return {
        title: `${docName} Expired`,
        body: `Your ${docName} has expired. Please upload an updated document.`,
      };
    }

    return {
      title: `${docName} Expiring Soon`,
      body: `Your ${docName} will expire in ${daysLeft} days. Please upload an updated document.`,
    };
  }

  /**
   * Check if user has already been notified
   */
  hasAlreadyNotified(user: any, documentName: string, daysLeft: number): boolean {
    return Boolean((user as { lastNotifiedAt?: { [key: string]: { [key: string]: boolean } } }).lastNotifiedAt?.[documentName]?.[daysLeft]);
  }

  /**
   * Add months to a Unix timestamp
   */
  addMonthsUnix(startUnix: number, months: number): number {
    const date = new Date(startUnix * 1000);
    const day = date.getDate();

    date.setMonth(date.getMonth() + months);

    if (date.getDate() < day) {
      date.setDate(0);
    }

    return Math.floor(date.getTime() / 1000);
  }

  /**
   * Convert value to number or null
   */
  private toNumber(value: unknown): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }
}