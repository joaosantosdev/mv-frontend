import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginPage} from './pages/login/login.page';
import {InputContentComponent} from './components/input-content/input-content.component';
import {SelectSearchComponent} from './components/select-search/select-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import UserService from './services/UserService';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobfunctionPage } from './pages/jobfunction/jobfunction.page';
import {AppRoutingModule} from './app.routing';
import JobFunctionService from './services/JobFunctionService';
import {StatusPipe} from './pipes/StatusPipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    JobfunctionPage,
    InputContentComponent,
    SelectSearchComponent,
    DashboardComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    JobFunctionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
