import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginError: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.loginError = '';
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.username, form.value.password).subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error => {
        this.isLoading = false;
        if(error.error.status === 403){
          this.loginError = 'Wrong Username or Password.'
        }
      })

  }

}
