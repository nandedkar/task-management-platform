export interface AccessTokenPayload {
  sub: string;
  sid: string;
  roles: string[];
}

export interface RefreshTokenPayload {
  sub: string;
  sid: string;
}
