import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../models/responseData.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastMessageService } from '../toastr.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.baseUrl}/api/v1/auth`;
  private userUrl = `${environment.baseUrl}/api/v1/user`;

  private token;
  private userId;
  private isAuthenticated;
  private authStatusList = new Subject<boolean>();
  private email;
  private userData;
  private name;
  private tokenTimer: any;


  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastMessageService) { }


  getAuthStatusListener() {
    return this.authStatusList.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getName() {
    return this.name;
  }

  getUserId() {
    return this.userId;
  }


  private setAuthTimer(duration) {
    const rem = (duration * 1000) - 2147483647;
    this.tokenTimer = setTimeout(() => {
      if (rem > 60000) {
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, rem);
      } else {
        this.logout();
      }
    }, 2147483647);
  }


  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const expiry = localStorage.getItem('expiry');

    const userData = {
      token,
      name,
      userId,
      email,
      expiry: new Date(expiry),
    };
    this.userData = userData;
    if (!token) {
      return;
    }
    return userData;
  }

  autoAuthUser() {
    this.getAuthData();
    const authInfo = this.userData;
    if (!authInfo) {
      return;
    }

    const expiresIn = authInfo.expiry.getTime() - Date.now();
    if (expiresIn > 60000) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.authStatusList.next(true);
      this.name = authInfo.name;
      this.userId = authInfo.userId;
      this.email = authInfo.email;
      this.setAuthTimer(expiresIn / 1000);
    }
  }


  signUpUser(data) {
    this.http.post<ResponseData>(`${this.baseUrl}/signup`, data)
      .subscribe((response) => {
        this.toastService.toastSuccess(response.message);
      }, (error) => {
        console.log(error.error);
        this.toastService.toastError(error.error.message);
      });
  }


  loginUser(data) {
    this.http.post<ResponseData>(`${this.baseUrl}/login`, data)
      .subscribe((response) => {
        if (!response.error) {

          const userData = response.data;
          this.userData = userData;
          this.token = userData.token;
          this.userId = userData._id;
          this.email = userData.email;
          this.name = userData.name;

          this.isAuthenticated = true;
          this.authStatusList.next(true);

          const expiresIn = Date.now() - userData.tokenExpiry || 2592000000;

          this.setAuthTimer(expiresIn / 1000);
          const expiryDuration = new Date(userData.tokenExpiry);


          localStorage.setItem('token', this.token);
          localStorage.setItem('name', this.name);
          localStorage.setItem('userId', this.userId);
          localStorage.setItem('email', this.email);
          localStorage.setItem('expiry', expiryDuration.toISOString());

          this.toastService.toastSuccess(response.message);
          this.router.navigate(['/portal/dashboard']);
        }
        this.toastService.toastSuccess(response.message);
      }, (error) => {
        this.toastService.toastError(error.error.message);
        console.log(error.error);
      });
  }

  verifyUser(token) {
    this.http.get<ResponseData>(`${this.baseUrl}/verify/${token}`)
      .subscribe((response) => {
        // if (!response.error) {
        //   this.userData = response.data;
        //   this.token = response.data.token;
        //   this.token = this.userData.token;
        //   this.userId = this.userData._id;
        //   this.email = this.userData.email;
        //   this.name = this.userData.name;

        //   this.isAuthenticated = true;
        //   this.authStatusList.next(true);

        //   const expiresIn = Date.now() - this.userData.tokenExpiry;
        //   this.setAuthTimer(expiresIn / 1000);
        //   const expiryDuration = new Date(this.userData.tokenExpiry);

        //   localStorage.setItem('token', this.token);
        //   localStorage.setItem('name', this.name);
        //   localStorage.setItem('userId', this.userId);
        //   localStorage.setItem('email', this.email);
        //   localStorage.setItem('expiry', expiryDuration.toISOString());

        //   this.router.navigate(['/portal/dashboard']);
        // }
        this.toastService.toastSuccess(response.message);
      }, (error) => {
        this.toastService.toastError(error.error.message);
        console.log(error.error);
      });
  }

  logout() {
    this.http.get<ResponseData>(`${this.baseUrl}/logout`)
      .subscribe((response) => {
      }, (error) => {
        console.log(error.error);
      });
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusList.next(false);
    this.email = null;
    this.userId = null;
    this.name = null;
    localStorage.clear();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/auth/login']);
    this.toastService.toastSuccess('You\'ve successfully logged out');
  }

}
