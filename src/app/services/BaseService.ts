import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Utils from '../utils/Utils';
import {environment} from '../../environments/environment';


@Injectable()
export default class BaseService {

  private baseUrl = environment.baseUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + Utils.getToken()
  });

  constructor(private http: HttpClient) {

  }

  public handlerError(error): any {
    return Promise.reject(error.error);
  }


  public async delete(url): Promise<any> {
    return this.http.delete(this.baseUrl + url).toPromise();
  }

  public async get(url): Promise<any> {
    return this.http.get(this.baseUrl + url, {}).toPromise();
  }

  public async getSecurity(url): Promise<any> {
    return this.http.get(this.baseUrl + url, {
      headers: this.headers
    }).toPromise();
  }

  public put(url, body): Promise<any> {
    return this.http.put(this.baseUrl + url, JSON.stringify(body), {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }).toPromise();

  }

  public putSecurity(url, body): Promise<any> {
    return this.http.put(this.baseUrl + url, JSON.stringify(body), {
      headers: this.headers
    }).toPromise();

  }

  public postSecurity(url, body): Promise<any> {
    return this.http.post(this.baseUrl + url, JSON.stringify(body), {
      headers: this.headers
    }).toPromise();

  }


  public deleteSecurity(url): Promise<any> {
    return this.http.delete(this.baseUrl + url, {
      headers: this.headers
    }).toPromise();

  }

  public post(url, body): Promise<any> {
    return this.http.post(this.baseUrl + url, JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).toPromise();

  }

}
