import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegistrationFormService } from '../Service/registration-form.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  userData: any = {};

  userCreate: any = {
    id: 0,

    firstName: '',

    lastName: '',

    email: '',

    password: '',

    post_title: '',

    phone_num: '',

    hiring_date: '',

    role:'',

    voitures: {
      matricule: '',

      type: '',
    },
  };

  value!: string;

  ListUsers!: any[];

  constructor(private service: RegistrationFormService) {}

  formulaire: FormGroup = new FormGroup({

    firstName: new FormControl('', [Validators.required]),

    lastName: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),
    ]),

    post_title: new FormControl('', [Validators.required]),

    phone_num: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
    ]),

    hiring_date: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
    ]),

    role : new FormControl('', [Validators.required]),

    matricule: new FormControl('', [Validators.required]),

    type: new FormControl('', [Validators.required]),
  });
  check() {
    console.log(this.formulaire.get('email')?.value);

    const user = {
      firstName: this.formulaire.get('firstName')?.value,

      lastName: this.formulaire.get('lastName')?.value,

      email: this.formulaire.get('email')?.value,

      password: this.formulaire.get('password')?.value,

      post_title: this.formulaire.get('post_title')?.value,

      phone_num: this.formulaire.get('phone_num')?.value,

      hiring_date: this.formulaire.get('hiring_date')?.value,

      role: "User",

      voitures: {
        matricule: this.formulaire.get('matricule')?.value,
        type: this.formulaire.get('type')?.value,
      },

    };
    console.log(user);

    this.service.create(user).subscribe(
      (res: any) => {
        this.userData = res;
      },

      (error: any) => {
        console.log(error);
      }
    );

    console.log(user);
  }
  onSubmit(f: NgForm) {
    console.log(f.value);

    console.log(f.valid);
  }
}

