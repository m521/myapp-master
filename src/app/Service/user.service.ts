import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


const  API_URL ="http://localhost:8385/SpringMvc/users/";
  const API_URL_VOITURE ="http://localhost:8385/SpringMvc/";



@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  private apiUrl = "http://localhost:8385/SpringMvc/users/";
  constructor(private Http:HttpClient) {}


  create(user:any): Observable<any>{
    return this.Http.post(API_URL, user);
  }



  get():Observable<any>{

    return this.Http.get(API_URL+"retrieve-allUsers");

  }



  delete(id:number) : Observable<any>{

    return this.Http.delete(API_URL+"delete-user/"+id)

  }

  modify(user:any) : Observable<any>{

    return this.Http.put(API_URL+"Modify-user/",user)

  }


  assignUserToPlace(id:string , idPlace:string){
    return this.Http.post(API_URL+"users/"+id+"/parking/"+idPlace,null);
  }

}

