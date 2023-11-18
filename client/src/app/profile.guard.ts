import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const profileGuard: CanActivateFn = async(route, state) => {
  const authService: AuthService = inject(AuthService);
  if (typeof authService.isLoggedIn() === 'boolean') {
    return authService.isLoggedIn() ?
    true :
    inject(Router).createUrlTree(["/", "login"])
  } 
  return (await authService.isLoggedIn() as boolean) ? 
  true :
  inject(Router).createUrlTree(["/", "login"])
};
