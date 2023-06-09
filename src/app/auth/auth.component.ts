import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {ApiService} from "../api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private apiService: ApiService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    console.log(mrToken)
    if (mrToken) {
      this.router.navigate(['/movies']);
    }
  }

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  registerMode = false
  loginStatus = ''

  saveForm() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        (result: any) => { // TODO change type
            this.router.navigate(['/movies']);
        },
        error => {
          console.log(error)
        }
      );
    }
  }


  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: any) => { // TODO change type
          console.log(result);
          this.loginStatus = '';
          this.cookieService.set('mr-token', result.token);
          this.router.navigate(['/movies'])
      },
      error => {
        console.log(error)
        if (error.status == 400) {
          this.loginStatus = "Username or Password is not correct, check it up again."
        }
      }
    );
  }
}
