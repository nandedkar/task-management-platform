export interface RegisterResponseDto {
  id: string;

  email: string;

  fullName: string;
}

export interface LoginResponseDto {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
  accessToken: string;
  refreshToken: string;
}
