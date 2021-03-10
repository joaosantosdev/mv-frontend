import {Component, OnInit} from '@angular/core';
import Utils from '../../utils/Utils';
import {Router} from '@angular/router';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
  }

  public isOpenSidebar = false;

  public items = [
    {label: 'Cargos', icon: 'icon_job', path: 'cargos', pathForm: 'cargo'},
    {label: 'Profissionais', icon: 'icon_professional', path: 'profissionais', pathForm: 'profissional'},
    {label: 'Estabelecimentos', icon: 'icon_establishment', path: 'estabelecimentos', pathForm: 'estabelecimento'},
    {label: 'Sair', icon: 'logout', path: 'sair'},
  ];

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  clickItem(item): void {
    if (item.path === 'sair') {
      Utils.deleteToken();
      this.router.navigate([`/login`]);
    } else {
      this.router.navigate([item.path]);
    }
  }

  itemActive(item): boolean {
    return this.router.url.includes(item.path) || this.router.url.includes(item.pathForm);
  }
}
