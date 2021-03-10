import BaseService from './BaseService';
import {Injectable} from '@angular/core';
import Utils from '../utils/Utils';

@Injectable()
export default class JobFunctionService extends BaseService {

  async save(body): Promise<any> {

    return this.postSecurity('jobfunctions', body);
  }

  async update(id, body): Promise<any> {
    return this.putSecurity(`jobfunctions/${id}`, body);
  }

  async getAll(params = {}): Promise<any> {
    return this.getSecurity(`jobfunctions${Utils.formatParams(params)}`);
  }

  async getById(id): Promise<any> {
    return this.getSecurity(`jobfunctions/${id}`);
  }

  async delete(id): Promise<any> {
    return this.deleteSecurity(`jobfunctions/${id}`);
  }
}
