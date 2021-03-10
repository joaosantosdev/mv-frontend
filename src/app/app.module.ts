import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginPage} from './pages/login/login.page';
import {InputContentComponent} from './components/input-content/input-content.component';
import {SelectSearchComponent} from './components/select-search/select-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import UserService from './services/UserService';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    InputContentComponent,
    SelectSearchComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
