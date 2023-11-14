import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  return !authService.isLoggedIn()
};
