import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  // * Redirect route
  {
    path: "",
    loadComponent: () =>
      import("./modules/pages/home/home.component").then(
        (m) => m.HomeComponent
      ),
    canActivate: [authGuard],
  },

  // * Login route
  {
    path: "login",
    loadComponent: () =>
      import("./modules/pages/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  // * Register route
  {
    path: "create-account",
    loadComponent: () => import("./modules/pages/create-account/create-account.component").then(
      (m) => m.CreateAccountComponent
    ),
  },
  {
    path: "**",
    redirectTo: "/login",
    pathMatch: "full",
  },
];
