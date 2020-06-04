import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRouterModule } from './user-router/user-router.module';
import { ContractComponent } from './contract/contract.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ContractComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRouterModule,
  ]
})
export class UserModule { }
