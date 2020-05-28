import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

const route: Routes = [
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'lead', loadChildren: '../../lead/lead.module#LeadModule', },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentsRouterModule { }
