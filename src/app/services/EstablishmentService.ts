import BaseService from './BaseService';
import {Injectable} from '@angular/core';
import Utils from '../utils/Utils';

@Injectable()
export default class EstablishmentService extends BaseService {

  async save(body): Promise<any> {

    return this.postSecurity('establishments', body);
  }

  async update(id, body): Promise<any> {
    return this.putSecurity(`establishments/${id}`, body);
  }

  async getAll(params = {}): Promise<any> {
    return this.getSecurity(`establishments${Utils.formatParams(params)}`);
  }

  async getById(id): Promise<any> {
    return this.getSecurity(`establishments/${id}`);
  }

  async delete(id): Promise<any> {
    return this.deleteSecurity(`establishments/${id}`);
  }
  async getAllList(): Promise<any> {
    return this.getSecurity(`establishments/all`);
  }
}
