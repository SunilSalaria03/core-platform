// Refresh token interface
export interface IRefreshTokenPayload {
    sub: string;     // userId ( this needs be id in overall flow )
    email: string;
    iat: number;     // issued at
    exp: number;     // expiry date
}

export interface IUser {
  id: string;
  email: string;
}
