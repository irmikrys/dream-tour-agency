import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../shared/services/message.service';
import {loginFormConfig} from '../../../shared/config/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  config = loginFormConfig;
  loginForm: FormGroup;

  private isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log('auth sub', authStatus);
        this.isLoading = false;
      }
    );
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSubmit() {
    const form = this.loginForm;

    if (form.invalid === true) {
      console.log(this.loginForm.controls);
      this.messageService.add('login failed, invalid form');
      return;
    } else {
      this.isLoading = true;
      this.authService.loginUser({
        email: form.get('email').value,
        password: form.get('password').value
      });
    }
  }

}
