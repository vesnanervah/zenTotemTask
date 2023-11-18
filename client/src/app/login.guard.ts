import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = async(route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (typeof authService.isLoggedIn() === 'boolean') {
    return authService.isLoggedIn() ?
    router.createUrlTree(["/", "profile"]) :
    true
  } 
  return (await authService.isLoggedIn() as boolean) ? 
  router.createUrlTree(["/", "profile"]) :
  true
};
