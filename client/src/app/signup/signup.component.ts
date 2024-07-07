import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../services/login-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: LoginAuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp(): void {
    const { username, password } = this.signupForm.value;
    this.authService.signup(username, password).subscribe(
      (data) => {
        console.log(data); // Handle successful signup
      },
      (error) => {
        console.error(error); // Handle signup error (e.g., display error message)
      }
    );
  }
}
