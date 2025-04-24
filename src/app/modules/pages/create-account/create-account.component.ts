import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccountRequestDto, CreateAccountResponseDto } from '@app/core/DTO/crate-account.dto';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: "app-create-account",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./create-account.component.html",
  styleUrl: "./create-account.component.scss",
})
export class CreateAccountComponent {
  //  * Injectables
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  //  * Signals
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // * Reactive Form
  readonly form = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    currentEmail: ["", [Validators.required, Validators.email]],
    currentPassword: ["", [Validators.required, Validators.minLength(8)]],
  });

  // * getters
  get email() {
    return this.form.controls.currentEmail;
  }
  get password() {
    return this.form.controls.currentPassword;
  }
  get name() {
    return this.form.controls.name;
  }

  onSubmit() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    this.loading.set(true);
    this.error.set(null);

    const { name, currentEmail, currentPassword } = this.form.value;

    const payload: CreateAccountRequestDto = {
      name: name!,
      email: currentEmail!,
      password: currentPassword!,
    };

    this.auth.signUp(payload).subscribe({
      next: (response: CreateAccountResponseDto) => {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(response.data.userRole));

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
