import BaseService from './BaseService';
import {Injectable} from '@angular/core';
import Utils from '../utils/Utils';

@Injectable()
export default class ProfessionalService extends BaseService {

  async save(body): Promise<any> {

    return this.postSecurity('professionals', body);
  }

  async update(id, body): Promise<any> {
    return this.putSecurity(`professionals/${id}`, body);
  }

  async getAll(params = {}): Promise<any> {
    return this.getSecurity(`professionals${Utils.formatParams(params)}`);
  }

  async getById(id): Promise<any> {
    return this.getSecurity(`professionals/${id}`);
  }

  async delete(id): Promise<any> {
    return this.deleteSecurity(`professionals/${id}`);
  }
}
