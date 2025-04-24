export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    data: {
        accessToken: string;
        user: User
    }
}
 interface User {
    name: string;
    role: string;
}