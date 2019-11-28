import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];

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

}
