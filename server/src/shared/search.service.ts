import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor() {}

  /**
   * Build search filter for MongoDB queries
   */
  buildSearchFilter(
    search: string,
    textFields: string[] = [],
    dateFields: string[] = [],
    module?: string
  ): { $or: any[] } {
    if (!search?.trim()) return { $or: [] };

    const orConditions: any[] = [];
    const normalized = search.toLowerCase();

    for (const field of textFields) {
      switch (field) {
        case 'role':
          if (['admin'].includes(normalized)) {
            orConditions.push({ [field]: 'admin' });
          } else if (['client'].includes(normalized)) {
            orConditions.push({ [field]: 'client' });
          } else if (['inspector'].includes(normalized)) {
            orConditions.push({ [field]: 'inspector' });
          }
          break;
        case 'email':
          if (search.includes('@')) {
            try {
              // Assuming you have access to encryption service
              // const encryptedEmail = this.commonUtilsService.encrypt(search.toLowerCase().trim());
              // orConditions.push({ [field]: encryptedEmail });
              orConditions.push({ [field]: { $regex: search, $options: 'i' } });
            } catch (error) {
              console.error('Error encrypting email:', error);
              orConditions.push({ [field]: { $regex: search, $options: 'i' } });
            }
          }
          break;
        case 'status':
          if (module === 'users_module') {
            if (['active'].includes(normalized)) {
              orConditions.push({ [field]: 1 });
            } else if (['inactive'].includes(normalized)) {
              orConditions.push({ [field]: 0 });
            } else if (['rejected'].includes(normalized)) {
              orConditions.push({ [field]: 2 });
            }
          } else {
            this.addBookingStatusConditions(orConditions, normalized, field);
          }
          break;
        case 'userType':
          if (['client'].includes(normalized)) {
            orConditions.push({ [field]: 'client' });
          } else if (['inspector'].includes(normalized)) {
            orConditions.push({ [field]: 'inspector' });
          }
          break;
        case 'interval':
          if (['monthly'].includes(normalized)) {
            orConditions.push({ [field]: 'month' });
          } else if (['yearly'].includes(normalized)) {
            orConditions.push({ [field]: 'year' });
          }
          break;
        case 'amount':
          this.addAmountCondition(orConditions, search, field);
          break;
        case 'certificateApproved':
          this.addCertificateStatusConditions(orConditions, normalized, field);
          break;
        case 'priceOrPercentage':
          this.addPriceCondition(orConditions, search, field);
          break;
        case 'type':
          this.addFeeTypeConditions(orConditions, normalized, field);
          break;
        case 'bookingDate':
          this.addDateCondition(orConditions, search, field);
          break;
        default:
          orConditions.push({ [field]: { $regex: search, $options: 'i' } });
          break;
      }
    }

    // Handle date search for date fields
    if (dateFields.length > 0) {
      const parsedDate = this.parseDate(search);
      if (parsedDate) {
        const startOfDay = new Date(parsedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(parsedDate);
        endOfDay.setHours(23, 59, 59, 999);

        for (const field of dateFields) {
          orConditions.push({
            [field]: { $gte: startOfDay, $lte: endOfDay },
          });
        }
      }
    }

    if (orConditions.length === 0) return { $or: [] };

    return { $or: orConditions };
  }

  private addBookingStatusConditions(orConditions: any[], normalized: string, field: string): void {
    const statusMappings = {
      'active': 'active',
      'accepted': 'accepted',
      'pending': 'pending',
      'rejected': 'rejected',
      'completed': 'completed',
      'cancelled': 'cancelled',
      'cancelled by client': 'cancelled by client',
      'expired': 'expired',
      'waiting': 'waiting',
      'waiting client approval': 'waiting client approval',
      'cancelled by inspector': 'cancelled by inspector',
      'inspection started': 'inspection started',
      'started': 'started',
      'inspection paused': 'inspection paused',
      'paused': 'paused',
      'inspection stopped': 'inspection stopped',
      'stopped': 'stopped',
    };

    for (const [key, value] of Object.entries(statusMappings)) {
      if (key.includes(normalized) || normalized.includes(key)) {
        orConditions.push({ [field]: value });
        break;
      }
    }
  }

  private addAmountCondition(orConditions: any[], search: string, field: string): void {
    const amountStr = search.startsWith('$') ? search.substring(1) : search;
    const amount = parseFloat(amountStr);
    if (!isNaN(amount)) {
      const decimalPlaces = amountStr.split('.')[1]?.length || 0;
      const step = Math.pow(10, -decimalPlaces);
      const min = amount;
      const max = amount + step;
      orConditions.push({ [field]: { $gte: min, $lt: max } });
    }
  }

  private addCertificateStatusConditions(orConditions: any[], normalized: string, field: string): void {
    const statusMappings = {
        'pending': 'pending',
      '0': 'pending',
      'approved': 'approved',
      '1': 'approved',
      'rejected': 'rejected',
      '2': 'rejected',
    };

    for (const [key, value] of Object.entries(statusMappings)) {
      if ([key].includes(normalized)) {
        orConditions.push({ [field]: value });
        break;
      }
    }
  }

  private addPriceCondition(orConditions: any[], search: string, field: string): void {
    const priceOrPercentageStr = search.startsWith('$') ? search.substring(1) : search;
    const priceOrPercentage = parseFloat(priceOrPercentageStr);
    if (!isNaN(priceOrPercentage)) {
      const decimalPlaces = search.split('.')[1]?.length || 0;
      const step = Math.pow(10, -decimalPlaces);
      const min = priceOrPercentage;
      const max = priceOrPercentage + step;
      orConditions.push({ [field]: { $gte: min, $lt: max } });
    }
  }

  private addFeeTypeConditions(orConditions: any[], normalized: string, field: string): void {
    const typeMappings = {
          'inspector': 'inspector rate',
      'inspector rate': 'inspector rate',
      '0': 'inspector rate',
      'platform': 'platform fee',
      'platform fee': 'platform fee',
      '1': 'platform fee',
      'client': 'client rate',
      'client rate': 'client rate',
      '2': 'client rate',
      'show-up': 'show up fee',
      'show up': 'show up fee',
      'show up fee': 'show up fee',
      '3': 'show up fee',
      'cancel': 'cancellation fee',
      'cancellation': 'cancellation fee',
      'cancellation fee': 'cancellation fee',
      '4': 'cancellation fee',
      'cities': 'max cities',
      'max': 'max cities',
      'max cities': 'max cities',
      '5': 'max cities',
    };

    for (const [key, value] of Object.entries(typeMappings)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        orConditions.push({ [field]: value });
        break;
      }
    }
  }

  private addDateCondition(orConditions: any[], search: string, field: string): void {
    const dateSearch = search.trim();

    // Full date match - try to parse various formats
    const parsedDate = this.parseDate(dateSearch);
    if (parsedDate) {
      const startOfDay = new Date(parsedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(parsedDate);
      endOfDay.setHours(23, 59, 59, 999);
      orConditions.push({
        [field]: { $gte: startOfDay, $lte: endOfDay },
      });
      return;
    }

    // Month/Year match
    const monthYearMatch = dateSearch.match(/^(\d{1,2})\/(\d{4})$/);
    if (monthYearMatch) {
      const month = parseInt(monthYearMatch[1]) - 1;
      const year = parseInt(monthYearMatch[2]);
      if (month >= 0 && month <= 11 && year >= 1900 && year <= 2100) {
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);
        orConditions.push({
          [field]: { $gte: startOfMonth, $lte: endOfMonth },
        });
        return;
      }
    }

    // Year match
    const yearMatch = dateSearch.match(/^(\d{4})$/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (year >= 1900 && year <= 2100) {
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
        orConditions.push({
          [field]: { $gte: startOfYear, $lte: endOfYear },
        });
        return;
      }
    }

    // Month match
    const monthMatch = dateSearch.match(/^(\d{1,2})$/);
    if (monthMatch) {
      const month = parseInt(monthMatch[1]) - 1;
      if (month >= 0 && month <= 11) {
        const currentYear = new Date().getFullYear();
        const startOfMonth = new Date(currentYear, month, 1);
        const endOfMonth = new Date(currentYear, month + 1, 0, 23, 59, 59, 999);
        orConditions.push({
          [field]: { $gte: startOfMonth, $lte: endOfMonth },
        });
        return;
      }
    }
  }

  private parseDate(dateString: string): Date | null {
    // Try various date formats
    const formats = [
      /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
      /^(\d{2})\/(\d{2})\/(\d{4})$/, // DD/MM/YYYY or MM/DD/YYYY
      /^(\d{2})-(\d{2})-(\d{4})$/, // DD-MM-YYYY or MM-DD-YYYY
    ];

    for (const format of formats) {
      const match = dateString.match(format);
      if (match) {
        const [, part1, part2, part3] = match;
        let year: number, month: number, day: number;

        if (format === formats[0]) { // YYYY-MM-DD
          year = parseInt(part1);
          month = parseInt(part2) - 1;
          day = parseInt(part3);
        } else { // DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY, MM-DD-YYYY
          // Try DD/MM/YYYY first, then MM/DD/YYYY
          const num1 = parseInt(part1);
          const num2 = parseInt(part2);
          const num3 = parseInt(part3);

          if (num1 > 12) { // Must be DD/MM/YYYY
            day = num1;
            month = num2 - 1;
            year = num3;
          } else if (num2 > 12) { // Must be MM/DD/YYYY
            month = num1 - 1;
            day = num2;
            year = num3;
          } else {
            // Ambiguous, try DD/MM/YYYY first
            day = num1;
            month = num2 - 1;
            year = num3;
          }
        }

        if (year >= 1900 && year <= 2100 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
          const date = new Date(year, month, day);
          if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
            return date;
          }
        }
      }
    }

    return null;
  }
}