import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  formData: FormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  constructor() {
  }

  ngOnInit() {
  }

  onClickSubmit = (data) => {
    console.log('login data', data);
  }

}
