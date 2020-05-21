import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private toastr: ToastrService) { }

  toastSuccess(message) {
    this.toastr.success(message, 'Success');
  }

  toastInfo(message) {
    this.toastr.info(message, 'Info');
  }

  toastError(message) {
    this.toastr.error(message, 'Error');
  }
}
