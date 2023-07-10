import { Component, OnInit, ViewChild  , AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatCalendarCellCssClasses, MatDateRangeInput,  } from '@angular/material/datepicker';
import { PlaceParkingService } from 'src/app/Service/place-parking.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  title = 'book';
  listBookedPlaceParkings : any[] = [];
  listReservedPlaceParkings : any[] = [];
  constructor(private placeParkingService : PlaceParkingService){
    this.placeParkingService.getBooked().subscribe((res :any)=>{
      this.listBookedPlaceParkings = res;
    })
    this.placeParkingService.getReserved().subscribe((res : any)=>{
      this.listReservedPlaceParkings = res;
    })
  }

  reservation(placeParking : any,status : boolean = false){
    const data = {
      endDate : placeParking.endDate,
      startDate : placeParking.startDate,
      status : status
    }
    if(status){
      this.placeParkingService.reserver(placeParking.id,data).subscribe((res :any)=>{
        alert("Validation has been confirmed");
      })
    }else{
      this.placeParkingService.cancelReserver(placeParking.id).subscribe(()=>{
        alert("Validation has been confirmed");
      })
    }
  }
}
