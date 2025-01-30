import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from './forms/forms.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { DynamicFormsModule } from './dynamic-forms/dynamic-forms.module';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [AppComponent, HomeComponent, SignupComponent, LoginComponent, NavbarComponent, SidebarComponent, MainComponent, RoomsComponent, NotFoundComponent, DynamicTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, DynamicFormsModule, 
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
