import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'profile',
        component: PageProfileComponent,
    },
    {
        path: 'login',
        component: PageLoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
