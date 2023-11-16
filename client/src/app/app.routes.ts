import { Routes } from '@angular/router';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './page-login/sign-in/sign-in.component';
import { SignUpComponent } from './page-login/sign-up/sign-up.component';
import { SuccessfulSignUpComponent } from './page-login/successful-sign-up/successful-sign-up.component';


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
        children: [
            {
                path: 'sign-in',
                component: SignInComponent,
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            },
            {
                path: 'successful',
                component: SuccessfulSignUpComponent
            },
            {
                path:'',
                redirectTo:'sign-in',
                pathMatch:'full'
            }
        ],
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];
