import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dialog} from '../../../utils/Dialog';
import EstablishmentService from '../../../services/EstablishmentService';

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.page.html',
  styleUrls: ['./establishment-list.page.css']
})
export class EstablishmentListPage implements OnInit {

  public list = [];
  public searchText = '';
  public pagination: any = {
    size: 5,
    page: 0,
    fisrt: true,
    last: true
  };

  constructor(private establishmentService: EstablishmentService, private router: Router) {
  }

  ngOnInit(): void {
    this.search();
  }

  async search(params: any = {}): Promise<any> {
    if (this.searchText !== '' && this.searchText !== null) {
      params.name = this.searchText;
    }
    await this.establishmentService.getAll({
      ...params,
      size: this.pagination.size,
      page: this.pagination.page
    }).then(response => {
      this.list = response.data.content;
      this.pagination.totalElements = response.data.totalElements;
      this.pagination.last = response.data.last;
      this.pagination.first = response.data.first;
    }).catch(error => {
      Dialog.info({message: error.error.data});
    });
  }

  edit(item): void {
    this.router.navigate([`/estabelecimento/${item.id}`]);
  }

  new(): void {
    this.router.navigate([`/estabelecimento`]);
  }

  async delete(item): Promise<any> {
    if (!item.id) {
      return;
    }
    const response = await Dialog.confirm({message: 'Deseja realmente excluir esse estabelecimento?'});
    if (response) {
      await this.establishmentService.delete(item.id).then(data => {
        Dialog.info({message: 'Establecimento excluído com sucesso.'});
        this.search();
      }).catch(error => {
        Dialog.info({message: error.error.data});
      });
    }
  }

  changePagination(page): void {
    this.pagination.page = page;
    this.search();
  }
}
