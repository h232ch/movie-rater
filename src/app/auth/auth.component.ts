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

  saveForm() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: any) => { // TODO change type
        console.log(result),
          this.cookieService.set('mr-token', result.token);
          this.router.navigate(['/movies'])
      },
      error => {
        console.log(error)
      }
    );
    console.log(this.authForm.value)
  }
}
