import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateLeadComponent } from '../create-lead/create-lead.component';
import { LeadListComponent } from '../lead-list/lead-list.component';

const routes: Routes = [
  { path: 'create', component: CreateLeadComponent },
  { path: 'edit/:leadId', component: CreateLeadComponent },
  { path: 'list', component: LeadListComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ], exports: [
    RouterModule
  ],
})
export class LeadRouterModule { }
