import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadListComponent } from './lead-list/lead-list.component';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { SharedModule } from '../shared/shared.module';
import { LeadRouterModule } from './lead-router/lead-router.module';
import { DocsComponent } from './docs/docs.component';
import { DocModalComponent } from './doc-modal/doc-modal.component';


@NgModule({
  declarations: [LeadListComponent, CreateLeadComponent, DocsComponent, DocModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeadRouterModule,
  ]
})
export class LeadModule { }
