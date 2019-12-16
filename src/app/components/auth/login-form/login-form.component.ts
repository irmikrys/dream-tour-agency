import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../shared/services/message.service';
import {loginFormConfig} from '../../../shared/config/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  roles: any = ['admin', 'user'];
  config = loginFormConfig;
  login = false;
  submitted = false;
  loginForm: FormGroup;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  formData: FormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid === true) {
      console.log(this.loginForm.controls);
      this.messageService.add('login failed, invalid form');
      return;
    } else {
      this.messageService.add('login succeeded');
      this.login = true;
    }
  }

}
