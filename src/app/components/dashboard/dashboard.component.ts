import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import { AuthService } from 'src/app/auth/auth.service';
import { LeadService } from 'src/app/lead/lead.service';
import { Subscription, Subscribable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  isAuthenticated;
  authStatusSubs: Subscription;

  allLeads = [];
  allLeadsSubs: Subscription;

  pendingLeads = [];
  acceptedLeads = [];
  rejectedLeads = [];

  leadsLength = 0;
  pendingLength = 0;
  acceptedLength = 0;
  rejectedLength = 0;

  url = `${environment.url}/lead/create`;
  button;

  constructor(
    private authService: AuthService,
    private leadService: LeadService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.button = `<a type="button" target="_blank" class="btn btn-primary" href="${this.url}">Add New Lead</a>`;

    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener()
      .subscribe((auth) => {
        this.isAuthenticated = auth;
      });

    if (!this.isAuthenticated) {
      this.router.navigate(['/auth/login']);
    }
    this.leadService.fetchAllUserLeads(0, 0);
    this.allLeads = this.leadService.getAllUserLeads();
    this.allLeadsSubs = this.leadService.getUpdatedUserLeadsListener()
      .subscribe((leads) => {
        this.allLeads = leads;
        this.leadsLength = this.allLeads.length;
        if (this.allLeads.length > 0) {
          this.pendingLeads = this.allLeads.filter((lead) => {
            return lead.status === 'PENDING';
          });
          this.pendingLength = this.pendingLeads.length;

          this.acceptedLeads = this.allLeads.filter((lead) => {
            return lead.status === 'ACCEPTED';
          });
          this.acceptedLength = this.acceptedLeads.length;

          this.rejectedLeads = this.allLeads.filter((lead) => {
            return lead.status === 'REJECTED';
          });
          this.rejectedLength = this.rejectedLeads.length;
        }
      });

  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
    this.allLeadsSubs.unsubscribe();
  }
}
