import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ContractComponent } from '../contract/contract.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: 'contract/:userId', component: ContractComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class UserRouterModule { }
