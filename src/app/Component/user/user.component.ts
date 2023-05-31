import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',

  styleUrls: ['./user.component.css'],
})
export class UserComponent {


  fieldTextType: boolean = true;
  ngOnInit(): void {
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  userData: any = {};

  userModify: any = {
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

  constructor(private service: UserServiceService) {
    this.getUsers();

  }

  formulaire: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    firstName: new FormControl('', [Validators.required]),

    lastName: new FormControl('', [Validators.required]),

    post_title: new FormControl('', [Validators.required]),

    role : new FormControl('', [Validators.required]),

    phone_num: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),
    ]),

    hiring_date: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
    ]),

    Matricule: new FormControl('', [Validators.required]),

    Type: new FormControl('', [Validators.required]),
  });

  openModel(user: any) {
    this.fieldTextType = !this.fieldTextType;
    this.userModify = {
      id: user.id,

      firstName: user.firstName,

      lastName: user.lastName,

      email: user.email,

      post_title: user.post_title,

      password: user.password,

      phone_num: user.phone_num,

      hiring_date: user.hiring_date,

      role : user.role,

      voitures: {
        matricule: user.voitures?.matricule,

        type: user.voitures?.type,
      },
    };
    console.log(this.userModify);
  }

  check() {
    console.log(this.formulaire.get('email')?.value);

    const user = {
      email: this.formulaire.get('email')?.value,
      firstName: this.formulaire.get('firstName')?.value,
      lastName: this.formulaire.get('lastName')?.value,
      post_title: this.formulaire.get('post_title')?.value,
      phone_num: this.formulaire.get('phone_num')?.value,
      password: this.formulaire.get('password')?.value,
      hiring_date: this.formulaire.get('hiring_date')?.value,
      role: this.formulaire.get('role')?.value,

      voitures: {
        matricule: this.formulaire.get('Matricule')?.value,
        type: this.formulaire.get('Type')?.value,
      },

    };
    console.log(user);

    this.service.create(user).subscribe(
      (res: any) => {
        this.userData = res;

        this.getUsers();
      },

      (error: any) => {
        console.log(error);
      }
    );

    console.log(user);
  }

  getUsers() {
    this.service.get().subscribe((res: any) => {
      console.log(res);
      this.ListUsers = res;
    });
  }

  modifyUsers(formulaire: NgForm) {
    this.service.modify(this.userModify).subscribe((res: any) => {
      alert('updated sucess !');
    });
  }

  deleteUser(id: any) {
    this.service.delete(id).subscribe((res: any) => {
      alert(res);
    });

    this.getUsers();
  }

  onSubmit(f: NgForm) {
    console.log(f.value);

    console.log(f.valid);
  }
}
