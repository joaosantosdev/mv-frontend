import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPage} from './pages/login/login.page';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {JobfunctionPage} from './pages/jobfunction/jobfunction.page';
import {ProfessionalFormPage} from './pages/professional/form/professional-form.page';
import {ProfessionalListPage} from './pages/professional/list/professional-list.page';
import {EstablishmentFormPage} from './pages/establishment/form/establishment-form.page';
import {EstablishmentListPage} from './pages/establishment/list/establishment-list.page';
import {AuthGuard} from './auth/AuthGuard';

const routes: Routes = [
    {
      path: 'login',
      component: LoginPage,
      canActivate: [AuthGuard]
    },
    {
      component: DashboardComponent,
      path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: 'cargos',
          component: JobfunctionPage,

        },
        {
          path: 'profissionais',
          component: ProfessionalListPage
        },
        {
          path: 'profissional',
          component: ProfessionalFormPage
        },
        {
          path: 'profissional/:id',
          component: ProfessionalFormPage
        },
        {
          path: 'estabelecimentos',
          component: EstablishmentListPage
        },
        {
          path: 'estabelecimento',
          component: EstablishmentFormPage
        },
        {
          path: 'estabelecimento/:id',
          component: EstablishmentFormPage
        },
      ]
    },

  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
