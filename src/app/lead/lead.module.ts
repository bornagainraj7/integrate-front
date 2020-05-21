import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadListComponent } from './lead-list/lead-list.component';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { SharedModule } from '../shared/shared.module';
import { LeadRouterModule } from './lead-router/lead-router.module';


@NgModule({
  declarations: [LeadListComponent, CreateLeadComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeadRouterModule,
  ]
})
export class LeadModule { }
