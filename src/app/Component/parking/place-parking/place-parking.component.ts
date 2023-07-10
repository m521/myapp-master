import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ParkingService } from 'src/app/Service/parking.service';
import { PlaceParkingService } from 'src/app/Service/place-parking.service';

@Component({
  selector: 'app-place-parking',
  templateUrl: './place-parking.component.html',
  styleUrls: ['./place-parking.component.css']
})
export class PlaceParkingComponent {
  id!:any;
  placeParkingToedit : number = 0;
  userId : any;
  parking:any ={};
  placeParkings :any[] =[]
  place :any ={}
  placeReservee:any;
  adminCheck : boolean = false;
  date!: any;
  placeParkingId:any;
  userEmail : string ="";
constructor(private route: ActivatedRoute , private pPService : ParkingService,private placeParkingService : PlaceParkingService){
  this.userEmail = localStorage.getItem("email") as string;
  localStorage.getItem('role') == "Admin" ? this.adminCheck = true : false;
  this.route.params.subscribe((params) => {
    console.log(params['id'])
    this.id = params['id'];
  });
}

formulaire: FormGroup = new FormGroup({
  status: new FormControl('', [Validators.required])
});

  formul: FormGroup = new FormGroup({
    start_date: new FormControl('', [Validators.required]),
    end_date : new FormControl('', [Validators.required])
  });

  get start_date(){
    return this.formul.get("start_date");
  }
  get end_date(){
    return this.formul.get("end_date");
  }


  bookForm(){
    const parking = {
      startDate : this.start_date?.value as Date,
      endDate : this.end_date?.value as Date
    }
    this.placeParkingService.book(this.placeParkingToedit,parking).subscribe(
        () => {
          alert("Your Submition done successfully Please wiat for the confiramtion")
          window.location.reload();
        },
        (error:any) => {
          console.log(error);
        }
    );
  }



ngOnInit() {
  this.pPService.getById(this.id).subscribe((res : any)=>{
    console.log(res);
    this.parking = res;
    this.placeParkings = res.placeparkings;
    console.log(this.parking)
  })
}

openModel(parking : any){
  console.log(parking)
  this.place = {
    id : parking.id,
    status : parking.status,
  }

  console.log(this.place);
}
modifyPlaceParkings(f :NgForm){
  this.placeParkingService.modify(this.parking.id,this.place).subscribe((res)=>{
    console.log(res)
    this.ngOnInit()
  })
}


deletePlaceParking(id :any){
  this.placeParkingService.delete(id).subscribe((res)=>{
    alert("Delete with success")
    this.ngOnInit()
  })}


}
