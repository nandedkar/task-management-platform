export interface AccessTokenPayload {
  sub: string;
  email: string;
  sessionId: string;
  roles: string[];
}

export interface RefreshTokenPayload {
  sub: string;
  sessionId: string;
}
