export interface CreateAccountRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface CreateAccountResponseDto {
    data: {
        accessToken: string;
        userRole: string;
    }
  }