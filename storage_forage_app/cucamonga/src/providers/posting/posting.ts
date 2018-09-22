import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostingProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostingProvider Provider');
  }

  checkConnection(): Promise<Object> {
      return this.http.get("localhost:8080/postings").toPromise();
  }

}
