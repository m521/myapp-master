import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8385/SpringMvc/users/login';


  constructor(private http: HttpClient) { }

  login(data : {email : string, password: string}) {
    return this.http.post(this.apiUrl, data);
  }
}
