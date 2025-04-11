import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: EmailVerificationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
