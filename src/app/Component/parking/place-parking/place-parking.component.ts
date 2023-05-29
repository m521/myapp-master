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
  parking:any ={};
  placeParkings :any[] =[]
  place :any ={}
  placeReservee:any;
  adminCheck : boolean = false;

constructor(private route: ActivatedRoute , private pPService : ParkingService,private placeParkingService : PlaceParkingService){
  localStorage.getItem('role') == "Admin" ? this.adminCheck = true : false;
  this.route.params.subscribe((params) => {
    console.log(params['id'])
    this.id = params['id'];
  });
}

formulaire: FormGroup = new FormGroup({

  status: new FormControl('', [Validators.required])});
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
reserverPlace() {
  this.placeParkingService.reserverPlace().subscribe(
    data => {
      this.placeReservee = data;
    },
    error => {
      console.error(error);
    }
  );
}


deletePlaceParking(id :any){
  this.placeParkingService.delete(id).subscribe((res)=>{
    alert("Delete with success")
    this.ngOnInit()
  })


}


check(){
  const parking = {
    status: this.formulaire.get('status')?.value
  }

  console.log(parking);
  this.placeParkingService.create(parking,this.parking.id).subscribe(
      (res:any) => {
        this.ngOnInit();
      },
      (error:any) => {
        console.log(error);
      }
  );

  console.log(parking);
}
}
