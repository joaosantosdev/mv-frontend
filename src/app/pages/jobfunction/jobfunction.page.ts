import {Component, OnInit} from '@angular/core';
import Const from '../../utils/Const';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import JobFunctionService from '../../services/JobFunctionService';
import Utils from '../../utils/Utils';
import {Dialog} from '../../utils/Dialog';

@Component({
  selector: 'jobfunction-page',
  templateUrl: './jobfunction.page.html',
  styleUrls: ['./jobfunction.page.css']
})
export class JobfunctionPage implements OnInit {

  public list = [];
  public listStatus = Const.listStatus;
  public form: FormGroup;
  public loading = false;
  public searchText = '';

  constructor(private builder: FormBuilder, private jobFunctionService: JobFunctionService) {
  }

  cleanForm(obj: any = {}): void {
    this.form = this.builder.group({
      id: [obj ? obj.id : null],
      name: [obj.name ? obj.name : null, Validators.required],
      description: [obj.name ? obj.name : null, Validators.required],
      status: [obj.status ? obj.status : null, Validators.required],
    });
  }


  ngOnInit(): void {
    this.cleanForm();
    this.search();
  }

  changeStatus(value): void {
    this.form.get('status').setValue(value);
  }

  async search(): Promise<any> {
    const params: any = {};
    if (this.searchText.trim() !== '' && this.searchText != null) {
      params.name = this.searchText;
    }
    await this.jobFunctionService.getAll(params).then(response => {
      this.list = response.data;
    }).catch(error => {
      this.list = [];
    });
  }

  async submit(): Promise<any> {
    if (this.loading) {
      return;
    }
    const hanlderError = error => {
      Dialog.info({message: error.error.data});
    };
    if (this.form.valid) {
      this.loading = true;
      if (this.form.value.id) {
        await this.jobFunctionService.update(this.form.value.id, this.form.value).then(response => {
          Dialog.info({message: 'Atualizado cadastrado com sucesso.'});
        }).catch(hanlderError);
      } else {
        await this.jobFunctionService.save(this.form.value).then(response => {
          Dialog.info({message: 'Cargo cadastrado com sucesso.'});
        }).catch(hanlderError);
      }
      this.cleanForm();
      this.search();
      this.loading = false;
    } else {
      Utils.validateFields(this.form.controls);
    }
  }

  async edit(obj): Promise<any> {
    this.cleanForm(obj);
  }

  async delete(obj): Promise<any> {
    if (!obj.id || this.form.value.id) {
      return;
    }
    this.cleanForm();
    const response = await Dialog.confirm({message: 'Deseja realmente excluir esse cargo?'});
    if (response) {

      await this.jobFunctionService.delete(obj.id).then(data => {
        Dialog.info({message: 'Cargo excluído com sucesso.'});
        this.search();
      }).catch(error => {
        Dialog.info({message: error.error.data});
      });
    }
  }
}
