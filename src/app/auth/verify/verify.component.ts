import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public token;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.has('token')) {
        this.token = param.get('token');
      }
    });

    if (this.token) {
      this.authService.verifyUser(this.token);
    }
  }

}
