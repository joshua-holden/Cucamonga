﻿import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Account } from '../../classes';
import { Posting } from '../../classes';
import { Observable } from "rxjs";

@Injectable()
export class AngularfireDbProvider {

    constructor(public afdb: AngularFireDatabase) {

  }

    public getAllAccounts(): AngularFireList<{}> {
        return this.afdb.list('/accounts/');
    }

    public getAccount(id: any): Observable<{}> {
<<<<<<< HEAD
        console.log(this.afdb.object(`/accounts/${id}`).valueChanges());
=======
>>>>>>> 2de33a595b5fb296cc33b42369b828e61424490b
        return this.afdb.object(`/accounts/${id}`).valueChanges();
    }

    public addAccount(account: Account) {
        this.afdb.object(`/accounts/${account.userID}/`).set(account);
  }

    public removeAccount(id: any) {
        this.afdb.object('/accounts/${id}/').remove()
  }

    public addPost(post) {
        var key = this.afdb.list(`/posts/`).push().key;
        this.afdb.object(`/posts/` + key).set(post);
    }
}