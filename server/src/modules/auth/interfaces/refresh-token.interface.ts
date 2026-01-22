export interface IRefreshTokenPayload {
    sub: string;     // userId
    email: string;
    iat: number;     // issued at
    exp: number;     // expiry date
  }
  