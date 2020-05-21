import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRouterModule } from './auth-router/auth-router.module';


@NgModule({
  declarations: [SignupComponent, LoginComponent, VerifyComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRouterModule,
  ]
})
export class AuthModule { }
