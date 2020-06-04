import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../models/responseData.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastMessageService } from '../toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.baseUrl}/api/v1/user`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastMessageService,
  ) { }


  getSingleUser(userId) {
    return this.http.get<ResponseData>(`${this.baseUrl}/${userId}`);
  }

  updateUser(userData) {
    this.http.put<ResponseData>(`${this.baseUrl}/update`, userData)
      .subscribe((response) => {
        if (!response.error) {
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError(response.message);
        }
      }, (error) => {
        console.log(error.error);
        this.toastService.toastError(error.error.message);
      });
  }

  updateProfilePic(picDoc) {
    this.http.put<ResponseData>(`${this.baseUrl}/profilepic`, picDoc)
      .subscribe((response) => {
        if (!response.error) {
          this.toastService.toastSuccess(response.message);
        }
      }, (error) => {
        console.log(error.error);
        this.toastService.toastError(error.error.message);
      });
  }

  signContract(userId) {
    return this.http.get<ResponseData>(`${this.baseUrl}/contract/${userId}`);
  }
}
