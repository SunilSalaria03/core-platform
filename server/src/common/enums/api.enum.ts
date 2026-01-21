export const API_STATUS = {
        SUCCESS: 'success',
        ERROR: 'error',
        FAILED: 'failed',
} as const;

export type ApiStatusEnum = typeof API_STATUS[keyof typeof API_STATUS];
