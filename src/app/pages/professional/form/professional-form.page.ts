import {Component, OnInit} from '@angular/core';
import Const from '../../../utils/Const';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import ValidatorsUtils from '../../../utils/ValidatorsUtils';
import Utils from '../../../utils/Utils';
import ProfessionalService from '../../../services/ProfessionalService';
import DefaultService from '../../../services/DefaultService';
import JobFunctionService from '../../../services/JobFunctionService';
import {Dialog} from '../../../utils/Dialog';
import {ActivatedRoute, Router} from '@angular/router';
import EstablishmentService from '../../../services/EstablishmentService';

@Component({
  selector: 'professional-form-page',
  templateUrl: './professional-form.page.html',
  styleUrls: ['./professional-form.page.css']
})
export class ProfessionalFormPage implements OnInit {
  public loading = false;
  public listStatus = Const.listStatus;
  public listStates = [];
  public listCities = [];
  public listJobFunctions = [];
  public listEstablishments = [];
  public listTypesPhone = Const.listTypesPhone;

  public form: FormGroup;

  public title = 'Cadastro de Profissionais';

  constructor(private builder: FormBuilder,
              private professionalService: ProfessionalService,
              private jobFunctionService: JobFunctionService,
              private establishmentService: EstablishmentService,
              private router: Router,
              private route: ActivatedRoute,
              private defaultService: DefaultService) {
  }

  ngOnInit(): void {
    this.cleanForm();
    this.getData();
  }

  async getData(): Promise<any> {
    const id = this.route.snapshot.params.id;

    await this.defaultService.states().then(response => {
      this.listStates = response.data;
    }).catch(error => {
      this.listStates = [];
    });

    await this.establishmentService.getAllList().then(response => {
      this.listEstablishments = response.data;
    }).catch(error => {
      this.listEstablishments = [];
    });

    await this.jobFunctionService.getAll().then(response => {
      this.listJobFunctions = response.data;
    }).catch(error => {
      this.listJobFunctions = [];
    });

    if (id) {
      this.title = 'Atualização de Profissional';
      await this.professionalService.getById(id).then(async response => {
        const data = response.data;
        data.address.cityId = data.address.city.id;
        data.address.stateId = data.address.city.state.id;
        data.jobFunctionId = data.jobFunction.id;
        await this.changeState(data.address.stateId);
        this.cleanForm(data);
      }).catch(error => {
        Dialog.info({message: error.error.data});
        this.router.navigate(['/profissionais']);
      });
    }
  }


  cleanForm(obj: any = {}): void {
    obj.address = (obj.address || {city: {}});
    this.form = this.builder.group({
      id: [obj.id],
      name: [obj.name ? obj.name : null, [Validators.required, ValidatorsUtils.noEmptyString]],
      email: [obj.email ? obj.email : null, [Validators.required, Validators.email, ValidatorsUtils.noEmptyString]],
      phones: this.getFormArrayPhones(obj.phones),
      establishments: this.getFormArrayEstablishments(obj.establishments),
      status: [obj.status ? obj.status : Const.status.ACTIVE, [Validators.required]],
      jobFunctionId: [obj.jobFunctionId ? obj.jobFunctionId : null, [Validators.required]],
      address: this.builder.group({
        cityId: [obj.address.cityId ? obj.address.cityId : null, Validators.required],
        stateId: [obj.address.stateId ? obj.address.stateId : null, Validators.required],
        district: [obj.address.district ? obj.address.district : null, [Validators.required, ValidatorsUtils.noEmptyString]],
        street: [obj.address.street ? obj.address.street : null, [Validators.required, ValidatorsUtils.noEmptyString]],
        number: [obj.address.number ? obj.address.number : null, [Validators.required, ValidatorsUtils.noEmptyString]],
      }),
    });

  }

  async save(json): Promise<any> {
    await this.professionalService.save(json).then(response => {
      Dialog.info({message: 'Cadastro realizado com sucesso.'});
    }).catch(error => {
      Dialog.info({message: error.error.data});
    });
    this.cleanForm();
  }

  async update(json): Promise<any> {
    await this.professionalService.update(json.id, json).then(response => {
      Dialog.info({message: 'Cadastro atualizado com sucesso.'});
    }).catch(error => {
      Dialog.info({message: error.error.data});
    });
    this.router.navigate(['/profissionais']);
    this.cleanForm();
  }

  async submit(): Promise<any> {
    if (this.form.valid) {
      const json: any = this.form.value;
      json.address.city = {id: json.address.cityId};
      json.address.status = Const.status.ACTIVE;
      json.jobFunction = {id: json.jobFunctionId};
      const ids = [];
      json.establishments = json.establishments.filter(item => {
        if (ids.includes(item.id)) {
          return false;
        }
        ids.push(item.id);
        return true;
      });
      this.loading = true;
      if (this.form.value.id) {
        await this.update(json);
      } else {
        await this.save(json);
      }
      this.loading = true;
    } else {
      Utils.validateFields(this.form.controls);
      const address = this.form.controls.address as FormGroup;
      Utils.validateFields(address.controls);
      for (const i in this.phonesArray.controls) {
        const group = this.phonesArray.controls[i] as FormGroup;
        Utils.validateFields(group.controls);
      }
    }
  }

  public getFormArrayPhones(phones = []): FormArray {
    if (phones.length > 0) {
      return this.builder.array(phones.map(phone => this.createPhone(phone)));
    }
    return this.builder.array([
      this.createPhone()
    ]);
  }

  public getFormArrayEstablishments(establishments = []): FormArray {
    if (establishments.length > 0) {
      return this.builder.array(establishments.map(establishment => this.createEstablishment(establishment)));
    }
    return this.builder.array([
      this.createEstablishment()
    ]);
  }

  public createEstablishment(establishment: any = {}): FormGroup {
    return this.builder.group({
      id: [establishment.id ? establishment.id : null, [Validators.required]],
    });
  }

  public createPhone(phone: any = {}): FormGroup {
    return this.builder.group({
      number: [phone.number ? phone.number : null, [Validators.required, ValidatorsUtils.noEmptyString]],
      residential: [phone.residential ? phone.residential : null, [Validators.required]],
    });
  }

  addPhone(): void {
    this.phonesArray.push(this.createPhone());
  }

  deletePhone(index): void {
    this.phonesArray.removeAt(index);
  }

  addEstablishment(): void {
    this.establishmentsArray.push(this.createEstablishment());
  }

  deleteEstablishment(index): void {
    this.establishmentsArray.removeAt(index);
  }

  get phonesArray(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  get establishmentsArray(): FormArray {
    return this.form.get('establishments') as FormArray;
  }

  getControl(name): any {
    return this.form ? this.form.get(name) : null;
  }

  getControlAddress(name): any {
    return this.form ? this.form.controls.address.get(name) : null;
  }

  changeCity(value): void {
    const address = this.form.controls.address as FormGroup;
    address.controls.cityId.setValue(value);
  }

  async changeState(value): Promise<any> {
    await this.defaultService.citiesByState(value).then(response => {
      this.listCities = response.data;
    }).catch(error => {
      this.listCities = [];
    });
    const address = this.form.controls.address as FormGroup;
    address.controls.stateId.setValue(value);
  }

  changeJobFunction(value): void {
    this.form.get('jobFunctionId').setValue(value);
  }

  changeStatus(value): void {
    this.form.get('status').setValue(value);
  }

  changePhoneResidential(value, group): void {
    group.get('residential').setValue(value);
  }

  changeEstablishment(value, group): void {
    group.get('id').setValue(value);
  }

}
