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
import { DynamicTableComponent } from './components/dynamic-components/dynamic-table/dynamic-table.component';
import { DynamicHeaderComponent } from './components/dynamic-components/dynamic-header/dynamic-header.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoaderService } from './services/custom-translate-loader.service';
import { DynamicFormsComponent } from './components/dynamic-components/dynamic-forms/dynamic-forms.component';
import { PaginationComponent } from './components/dynamic-components/pagination/pagination.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PopUpModalComponent } from './components/dynamic-components/pop-up-modal/pop-up-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    RoomsComponent,
    NotFoundComponent,
    DynamicTableComponent,
    DynamicHeaderComponent,
    DynamicFormsComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    PopUpModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoaderService, // Use the custom loader service
      },
    }),
   ToastrModule.forRoot({
    positionClass: 'toast-top-right',
    timeOut: 3000,
   })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
