import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  adminCheck : boolean = false;
  email : string = "";
  constructor(private userService : UserServiceService,private router : Router){
    localStorage.getItem('role') == "Admin" ? this.adminCheck = true : false;
    this.email = localStorage.getItem('email') as string;
    }

  logOut(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
