import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginRequestDto, LoginResponseDto } from '@app/core/DTO/login.dto';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  //  * Injectables
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  //  * Signals
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // * Reactive Form
  readonly form = this.fb.nonNullable.group({
    currentEmail: ['', [Validators.required, Validators.email]],
    currentPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  // * getters
  get email() {
    return this.form.controls.currentEmail;
  }
  get password() {
    return this.form.controls.currentPassword;
  }
  get touched() {
    return this.form.touched || this.email.touched || this.password.touched;
  }

  onSubmit() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    this.loading.set(true);
    this.error.set(null);

    const { currentEmail, currentPassword } = this.form.value;

    const payload: LoginRequestDto = {
      email: currentEmail!,
      password: currentPassword!,
    };

    this.auth.login(payload).subscribe({
      next: (response: LoginResponseDto) => {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        this.router.navigateByUrl("/");
      },
      error: (err) => {
        const msg =
          err.status === 401
            ? "Credenciais inválidas."
            : "Falha ao conectar. Tente de novo.";
        this.error.set(msg);
        this.loading.set(false);
      },
    });
  }
  onReset() {
    this.form.reset();
    this.loading.set(false);
    this.error.set(null);
  }
}
 