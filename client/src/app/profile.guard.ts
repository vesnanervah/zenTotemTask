import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const profileGuard: CanActivateFn = async(route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (typeof authService.isLoggedIn() === 'boolean') {
    return authService.isLoggedIn() ?
    true :
    router.createUrlTree(["/", "login"])
  } 
  return (await authService.isLoggedIn() as boolean) ? 
  true :
  router.createUrlTree(["/", "login"])
};
