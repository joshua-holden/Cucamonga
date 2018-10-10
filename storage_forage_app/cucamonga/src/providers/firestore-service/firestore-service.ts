import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from "rxjs";

@Injectable()
export class FirestoreProvider {

    private photo: any;

    constructor(public afs: AngularFireStorage, public afa: AngularFireAuth) {
  }

    addPicture(photo: string) {
        this.afa.authState.subscribe(auth => {
            this.afs.ref(`user-photos/${auth.uid}`).putString(photo);
        });     
    }

    getAccountPhoto(id: any): Observable<any> {
        return this.afs.ref(`user-photos/${id}`).getDownloadURL();
    }

}
