import { inject, Injectable } from '@angular/core';
import { CreateAccountRequestDto, CreateAccountResponseDto } from '@app/core/DTO/crate-account.dto';
import { LoginRequestDto, LoginResponseDto } from '@app/core/DTO/login.dto';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = inject(ApiService);

  login(payload: LoginRequestDto): Observable<LoginResponseDto> {
    return this.api.post('auth/signin', payload);
  }

  signUp(payload: CreateAccountRequestDto): Observable<CreateAccountResponseDto> {
    return this.api.post('auth/signup', payload);
  }

}