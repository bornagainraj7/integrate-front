import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isAuthenticated;
  authStatusSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener()
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      });

    if (this.isAuthenticated) {
      this.router.navigate(['/portal/dashboard']);
    }
  }

  onSigupForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.signUpUser(form.value);
  }

  keyPress(event) {
    let k;
    k = event.charCode;
    return ((k >= 48 && k <= 57));
  }
}
