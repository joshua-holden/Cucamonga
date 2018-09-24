import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FirestoreServiceProvider {

  constructor(public http: HttpClient, public afs: AngularFirestore) {
    console.log('Hello FirestoreServiceProvider Provider');
  }

  addPost(value){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/posts').add({
          title: value.title,
          address: value.address,
          price: value.price,
        })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
      })
    }

}
