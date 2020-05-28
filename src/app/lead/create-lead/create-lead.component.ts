import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeadService } from '../lead.service';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastMessageService } from 'src/app/toastr.service';
import { Router } from '@angular/router';
import { combineAll } from 'rxjs/operators';


@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.css']
})
export class CreateLeadComponent implements OnInit, OnDestroy {

  allComplaintTypes;
  allPolicyTypes;
  allInsCompanies;
  isAuthenticated;

  public policyTypesSubs;
  public insCompSubs;
  public complaintTypesSubs;
  public authStatusSubs;

  constructor(
    private leadService: LeadService,
    private authService: AuthService,
    private toast: ToastMessageService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.leadService.fetchAllComplaintTypes();
    this.leadService.fetchAllPolicyTypes();
    this.leadService.fetchAllInsCompanies();

    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener()
      .subscribe((auth) => {
        this.isAuthenticated = auth;
        if (!this.isAuthenticated) {
          this.toast.toastError('You\'re not logged in, please login first');
          this.router.navigate(['/auth/login']);
        }
      });


    this.allPolicyTypes = this.leadService.getAllPolicyTypes();
    this.policyTypesSubs = this.leadService.getUpdatedPolicyTypesListener()
      .subscribe((policyTypes) => {
        this.allPolicyTypes = policyTypes;
      });

    this.allComplaintTypes = this.leadService.getAllComplaintTypes();
    this.complaintTypesSubs = this.leadService.getUpdatedComplaintTypesListener()
      .subscribe((complaintTypes) => {
        this.allComplaintTypes = complaintTypes;
      });

    this.allInsCompanies = this.leadService.getAllInsCompanies();
    this.insCompSubs = this.leadService.getUpdatedInsCompaniesListener()
      .subscribe((insComps) => {
        this.allInsCompanies = insComps;
      });

  }

  onCreateLead(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.leadService.submitLead(form.value);
  }

  onToggle(event) {
    console.log(event);
  }

  keyPress(event) {
    let k;
    k = event.charCode;
    return ((k >= 48 && k <= 57));
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
    this.policyTypesSubs.unsubscribe();
    this.insCompSubs.unsubscribe();
    this.complaintTypesSubs.unsubscribe();
  }
}
