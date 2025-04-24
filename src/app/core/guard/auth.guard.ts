import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = !!sessionStorage.getItem('accessToken');
  
  return isLoggedIn ? true : router.createUrlTree(['/login']);
};
