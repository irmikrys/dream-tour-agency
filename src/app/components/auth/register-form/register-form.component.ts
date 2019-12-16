import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {registerFormConfig} from '../../../shared/config/forms';
import {MessageService} from '../../../shared/services/message.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {

  config = registerFormConfig;
  registered = false;
  submitted = false;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
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
    this.submitted = true;

    if (this.registerForm.invalid === true) {
      this.messageService.add('registration failed, invalid form');
      return;
    } else {
      this.messageService.add('registration succeeded');
      this.registered = true;
    }
  }

}
