import {Component, OnInit} from '@angular/core';
import ProfessionalService from '../../../services/ProfessionalService';
import {Dialog} from '../../../utils/Dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'professional-list-page',
  templateUrl: './professional-list.page.html',
  styleUrls: ['./professional-list.page.css']
})
export class ProfessionalListPage implements OnInit {
  public list = [];
  public searchText = '';
  public pagination: any = {
    size: 5,
    page: 0,
    fisrt: true,
    last: true
  };

  constructor(private professionalService: ProfessionalService, private router: Router) {
  }

  ngOnInit(): void {
    this.search();
  }

  async search(params: any = {}): Promise<any> {
    if (this.searchText !== '' && this.searchText !== null) {
      params.email = this.searchText;
      params.name = this.searchText;
    }
    await this.professionalService.getAll({
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
    this.router.navigate([`/profissional/${item.id}`]);
  }

  new(): void {
    this.router.navigate([`/profissional`]);
  }

  async delete(item): Promise<any> {
    if (!item.id) {
      return;
    }
    const response = await Dialog.confirm({message: 'Deseja realmente excluir esse profissional?'});
    if (response) {
      await this.professionalService.delete(item.id).then(data => {
        Dialog.info({message: 'Profissional excluído com sucesso.'});
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
