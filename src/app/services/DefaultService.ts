import BaseService from './BaseService';
import {Injectable} from '@angular/core';
import Utils from '../utils/Utils';

@Injectable()
export default class DefaultService extends BaseService {

  async states(): Promise<any> {
    return this.getSecurity('states');
  }

  async citiesByState(id): Promise<any> {
    return this.getSecurity(`states/${id}/cities`);
  }

}
