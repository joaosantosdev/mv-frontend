import BaseService from './BaseService';
import {Injectable} from '@angular/core';

@Injectable()
export default class UserService extends BaseService {

  async login(body): Promise<any> {
    return this.post('user/login', body);
  }
  
  async register(body): Promise<any> {
    return this.post('user/register', body);
  }
}
