import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostingProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostingProvider Provider');
  }

  checkConnection(): Promise<Object> {
      return this.http.get("localhost:8080/postings").toPromise();
  }

}
