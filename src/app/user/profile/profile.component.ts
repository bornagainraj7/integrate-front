import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';
import { ToastMessageService } from 'src/app/toastr.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId;
  userData;
  url = `${environment.baseUrl}`;

  maxDate;
  disableForm = false;

  genders = ['Male', 'Female'];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastMessageService,

  ) {
    const today = new Date();
    const year = today.getFullYear();
    const date = today.getDate();
    const month = today.getMonth();
    this.maxDate = new Date(year - 18, month, date);
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userService.getSingleUser(this.userId)
      .subscribe((response) => {
        if (!response.error) {
          this.userData = response.data;
          this.userData.createdAt = new Date(this.userData.createdAt);
        }
      }, (error) => {
        console.log(error.error);
        this.toastService.toastError(error.error.message);
      });
  }

  onDobChange(event: MatDatepickerInputEvent<Date>) {
    const year = event.value.getFullYear();
    const age = new Date().getFullYear() - year;
    this.userData.age = age;
  }

  onDpChange(event) {
    const formData = new FormData();
    formData.append(event.path[0].name, event.target.files[0], 'profilepic');
    this.userService.updateProfilePic(formData);
  }

  onPanCardChange(pan) {
    const regexpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (!regexpan.test(pan.value)) {
      this.toastService.toastError('Invalid PAN Number');
      this.disableForm = true;
    } else {
      this.disableForm = false;
    }
    this.userData.panNumber = this.userData.panNumber.toUpperCase();
  }

  updateUser(form: NgForm) {
    if (form.invalid || this.disableForm) {
      return;
    }

    this.userService.updateUser(form.value);
  }

  keyPress(event) {
    let k;
    k = event.charCode;
    return ((k >= 48 && k <= 57));
  }

}
