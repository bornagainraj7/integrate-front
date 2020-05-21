import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { AuthGuard } from '../auth/auth.guard';

const route: Routes = [
  { path: '', redirectTo: 'auth/signup', pathMatch: 'full' },
  { path: 'auth', loadChildren: 'src/app/auth/auth.module#AuthModule' },
  {
    path: 'portal',
    component: LayoutComponent,
    loadChildren: 'src/app/components/components.module#ComponentsModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route),
  ],
})
export class AppRouterModule { }
