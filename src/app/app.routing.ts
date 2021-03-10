import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPage} from './pages/login/login.page';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {JobfunctionPage} from './pages/jobfunction/jobfunction.page';

const routes: Routes = [
  {
    path: 'login', component: LoginPage
  },
  {
    component: DashboardComponent,
    path: '',
    children: [
      {
        path: 'cargos', component: JobfunctionPage
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
