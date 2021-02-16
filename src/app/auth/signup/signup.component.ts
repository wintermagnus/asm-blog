import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading = false;

  signupError: string = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp(form: NgForm) {
    this.signupError = null;
    if (form.invalid) {
      return;
    }
    this.authService.signUp(form.value.username, form.value.email, form.value.password)
      .subscribe(
        (res) => {
          console.log(res);
          // TODO: Redirect to signup success page
        },
        (errorMessage) => {
          this.signupError = errorMessage;
        }
      );


  }
}
