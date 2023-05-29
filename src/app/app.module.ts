import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule , Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {HttpClientModule ,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { UserComponent } from './Component/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParkingComponent } from './Component/parking/parking.component';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaceParkingComponent } from './Component/parking/place-parking/place-parking.component';
import { StatisticsComponent } from './Component/statistics/statistics.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OperationsComponent } from './Component/operations/operations.component';
import { ReservationsComponent } from './Component/reservations/reservations.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthInterceptor } from './auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import {MatIconModule} from '@angular/material/icon';
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationFormComponent,
    DashboardComponent,
    UserComponent,
    ParkingComponent,
    PlaceParkingComponent,
    StatisticsComponent,
    OperationsComponent,
    ReservationsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
