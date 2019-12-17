import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {registerFormConfig} from '../../../shared/config/forms';
import {MessageService} from '../../../shared/services/message.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {

  config = registerFormConfig;
  registerForm: FormGroup;

  private isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const form = this.registerForm;

    if (form.invalid === true) {
      this.messageService.add('registration failed, invalid form');
      return;
    } else {
      this.isLoading = true;
      this.authService.createUser({
        name: form.get('name').value,
        surname: form.get('surname').value,
        email: form.get('email').value,
        password: form.get('password').value,
      });
    }
  }

}
