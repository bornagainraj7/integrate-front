import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastMessageService } from 'src/app/toastr.service';
import { NgForm } from '@angular/forms';
import { LeadService } from '../lead.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormComponent implements OnInit, OnDestroy {

  userId;
  userData;
  disableForm = false;

  policyTypeId;
  policyTypes;
  complaintTypes;
  policyTypeSubs: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private leadService: LeadService,
    private userService: UserService,
    private toastrService: ToastMessageService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.has('userId')) {
        this.userId = param.get('userId');

        this.userService.getSingleUser(this.userId)
          .subscribe((response) => {
            if (!response.error) {
              this.userData = response.data;
            }
          }, (error) => {
            this.disableForm = true;
            this.toastrService.toastError(error.error.message);
            window.open('', '_parent', '').close();
            setTimeout(() => {
            }, 3000);
          });
      } else {
        this.disableForm = true;
        this.toastrService.toastError('Cannot find Vendor ID, so you won\'t be able to submit form');
        setTimeout(() => {
          window.open('', '_parent', '').close();
        }, 3000);
      }
    });

    this.leadService.fetchAllPolicyTypes();
    this.getPolicyTypes();
  }

  getPolicyTypes() {
    this.policyTypeSubs = this.leadService.getUpdatedPolicyTypesListener()
      .subscribe((policyTypes) => {
        this.policyTypes = policyTypes;
      });
  }

  onPolicyChange(event) {
    this.leadService.fetchComplaintTypes(this.policyTypeId)
      .subscribe((response) => {
        if (!response.error) {
          this.complaintTypes = response.data;
        } else {
          this.complaintTypes = null;
        }
      }, (error) => {
        console.log(error.error);
      });
  }

  onSubmit(form: NgForm) {
    if (this.disableForm || form.invalid) {
      return;
    }
    this.leadService.leadWithoutToken(form.value, this.userId)
      .subscribe((response) => {
        if (!response.error) {
          this.toastrService.toastSuccess(response.message);
        } else {
          this.toastrService.toastError(response.message);
        }
      }, (error) => {
        console.log(error.error);
        this.toastrService.toastError(error.error.message);
      });
  }

  keyPress(event) {
    let k;
    k = event.charCode;
    return ((k >= 48 && k <= 57));
  }


  ngOnDestroy() {
    this.policyTypeSubs.unsubscribe();
  }
}
