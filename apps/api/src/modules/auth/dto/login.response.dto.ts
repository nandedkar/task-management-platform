export interface LoginResponseDto {
  user: {
    id: string;
    email: string;
    fullName: string;
    roles: string[];
  };
  accessToken: string;

  refreshToken: string;
}
