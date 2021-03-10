import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginPage} from './pages/login/login.page';
import {InputContentComponent} from './components/input-content/input-content.component';
import {SelectSearchComponent} from './components/select-search/select-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import UserService from './services/UserService';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {JobfunctionPage} from './pages/jobfunction/jobfunction.page';
import {AppRoutingModule} from './app.routing';
import JobFunctionService from './services/JobFunctionService';
import {StatusPipe} from './pipes/StatusPipe';
import {ProfessionalFormPage} from './pages/professional/form/professional-form.page';
import ProfessionalService from './services/ProfessionalService';
import DefaultService from './services/DefaultService';
import {ProfessionalListPage} from './pages/professional/list/professional-list.page';
import {PaginationComponent} from './components/pagination/pagination.component';
import EstablishmentService from './services/EstablishmentService';
import { EstablishmentFormPage } from './pages/establishment/form/establishment-form.page';
import { EstablishmentListPage } from './pages/establishment/list/establishment-list.page';
import {AuthGuard} from './auth/AuthGuard';
import {AuthInterceptor} from './auth/AuthInterceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginPage,
        JobfunctionPage,
        ProfessionalFormPage,
        ProfessionalListPage,
        InputContentComponent,
        SelectSearchComponent,
        DashboardComponent,
        StatusPipe,
        PaginationComponent,
        EstablishmentFormPage,
        EstablishmentListPage
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
    JobFunctionService,
    ProfessionalService,
    DefaultService,
    EstablishmentService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
