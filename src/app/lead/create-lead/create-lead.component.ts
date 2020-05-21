import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeadService } from '../lead.service';
import { Subscription, Observable, combineLatest } from 'rxjs';


@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.css']
})
export class CreateLeadComponent implements OnInit, OnDestroy {

  allComplaintTypes;
  allPolicyTypes;
  allInsCompanies;

  public policyTypesSubs: Subscription;
  public insCompSubs: Subscription;
  public complaintTypesSubs: Subscription;

  constructor(private leadService: LeadService) { }

  ngOnInit(): void {
    this.leadService.fetchAllComplaintTypes();
    this.leadService.fetchAllPolicyTypes();
    this.leadService.fetchAllInsCompanies();

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
    this.policyTypesSubs.unsubscribe();
    this.insCompSubs.unsubscribe();
    this.complaintTypesSubs.unsubscribe();
  }
}
