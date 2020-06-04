import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { ToastMessageService } from 'src/app/toastr.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  userId;
  userData;
  disableForm = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toast: ToastMessageService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((param: ParamMap) => {
        if (param.has('userId')) {
          this.userId = param.get('userId');
          this.userService.getSingleUser(this.userId)
            .subscribe((response) => {
              if (!response.error) {
                this.userData = response.data;
              }
            }, (error) => {
              console.log(error.error);
            });
        } else {
          this.disableForm = true;
          this.toast.toastError('Cannot find Vendor ID, please clink on the link n your confirmation email');
        }
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid || this.disableForm) {
      return;
    }
    this.userService.signContract(this.userId)
      .subscribe((response) => {
        if (!response.error) {
          this.toast.toastSuccess(response.message);
        } else {
          this.toast.toastError(response.message);
        }
      }, (error) => {
        console.log(error.error);
        this.toast.toastError(error.error.message);
      });

  }

}
