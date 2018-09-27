import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Account } from '../../classes';
import { Observable } from "rxjs";

@Injectable()
export class AngularfireDbProvider {

    constructor(public afdb: AngularFireDatabase) {

  }

    public getAllAccounts(): AngularFireList<{}> {
        return this.afdb.list('/accounts/');
    }

    public getAccount(id: any): Observable<{}> {
        return this.afdb.object(`/accounts/${id}`).valueChanges();
    }

    public addAccount(account: Account) {
        this.afdb.object(`/accounts/${account.userID}/`).set(account);
  }

    public removeAccount(id: any) {
        this.afdb.object('/accounts/${id}/').remove()
  }
}
