﻿import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Account, Posting } from '../../classes';
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
        this.afdb.object(`/accounts/${account.userID}/`).set(account).catch(err => console.log(err));
    }

    public updateAccount(id: any, account: Account) {
        this.afdb.object(`/accounts/${id}/`).update(account);
    }

    public removeAccount(id: any) {
        this.afdb.object(`/accounts/${id}/`).remove()
    }

    public addPost(post) {
        var key = this.afdb.list(`/posts/`).push(post).key;
        this.afdb.object(`/posts/` + key).set(post);
        return key;
    }

    public deletePost(post) {
        console.log(post.postID);
        this.afdb.object(`/posts/` + post.postID).remove();
    }

    public updatePost(post) {
        this.afdb.object(`/posts/` + post.postID).update(post);
    }

    public getAllPosts(): AngularFireList<Posting> {
        return this.afdb.list('/posts/');
    }

    public addReservation(res) {
        var key = this.afdb.list(`/reservations/`).push(res).key;
        this.afdb.object(`/reservations/` + key).set(res);
        return key;
    }

    public deleteReservation(res) {
        console.log(res.reservationID);
        this.afdb.object(`/reservations/` + res.reservationID).remove();
    }

    public updateReservation(res) {
        this.afdb.object(`/reservations/` + res.reservationID).update(res);
    }


}
