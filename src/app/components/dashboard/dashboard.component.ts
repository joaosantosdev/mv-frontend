import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  public isOpenSidebar = true;

  public items = [
    {label: 'Cargo', icon: 'icon_job'},
    {label: 'Profissional', icon: 'icon_professional'},
    {label: 'Estabelecimento', icon: 'icon_establishment'},
    {label: 'Sair', icon: 'logout'},

  ];

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar;
  }
}
