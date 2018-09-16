import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AccountProvider Provider');
  }

  checkConnection(): Promise<Object> {
      return this.http.get('localhost:8080/accounts').toPromise();
  }
}
