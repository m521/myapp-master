import { Component } from '@angular/core';
import { OperationsService } from 'src/app/Service/operations.service';
import { UserServiceService } from 'src/app/Service/user.service';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent {
  iduser : any;
  idPlace : any;
  UserAssignResponse! : any[];
  constructor(private service: OperationsService,private UserServiceService:UserServiceService){}

  getOperations(){
    this.service.get().subscribe((res:any)=>{
      this.UserAssignResponse = res;
      console.log(res)
    });
  }


assign(){
  this.UserServiceService.assignUserToPlace(this.iduser,this.idPlace).subscribe((res)=>{
    console.log(res)
  })
}

}
