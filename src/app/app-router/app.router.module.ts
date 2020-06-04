import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { AuthGuard } from '../auth/auth.guard';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { LeadFormComponent } from '../lead/lead-form/lead-form.component';
import { ContractComponent } from '../user/contract/contract.component';

const route: Routes = [
  { path: '', redirectTo: 'auth/signup', pathMatch: 'full' },
  { path: 'auth', loadChildren: 'src/app/auth/auth.module#AuthModule' },
  { path: 'create/new/lead/:userId', component: LeadFormComponent, pathMatch: 'full' },
  {
    path: 'portal',
    component: LayoutComponent,
    loadChildren: 'src/app/components/components.module#ComponentsModule',
    canActivate: [AuthGuard]
  },
  { path: 'user/contract/:userId', component: ContractComponent, pathMatch: 'full' },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route),
  ],
})
export class AppRouterModule { }
