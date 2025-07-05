import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'; // already created
import { SecurityService } from './app/security.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate {
  constructor(private router: Router, private security: SecurityService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');
    const allowedRoles = route.data['allowedRoles'] as string[] | undefined;

    // 🔒 Not logged in → redirect to login
    if (!isLoggedIn) {
      return this.router.createUrlTree(['/login']);
    }

    // ✅ Logged in but unauthorized → redirect to current route or /dashboard
    if (allowedRoles && !allowedRoles.includes(role || '')) {
      const previousRoute = this.security.getCurrentRoute();
      console.warn(
        `❌ Access denied for role: ${role}, redirecting to ${previousRoute}`
      );
      return this.router.createUrlTree([previousRoute || '/dashboard']);
    }

    // ✅ Access granted
    return true;
  }
}
