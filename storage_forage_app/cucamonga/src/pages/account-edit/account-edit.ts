import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditPage {

    private account: Observable<{}>;
    private editAccount: FormGroup;
    private photo: string;
    private selected: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public formbuilder: FormBuilder,
        public afa: AngularFireAuth,
        private camera: Camera,
        public afdb: AngularfireDbProvider) {
        this.editAccount = this.formbuilder.group({
            firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            birthday: ['', Validators.required],
            email: ['', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
            password: ['', Validators.required],
            passwordconfirm: ['', Validators.required],
        }, { validator: this.matchingPasswords('password', 'passwordconfirm') }); 
        this.afa.authState.subscribe(auth => {
            if (auth != null) this.account = afdb.getAccount(auth.uid);
        });
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let passwordconfirm = group.controls[confirmPasswordKey];

            if (password.value !== passwordconfirm.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

    getPictures() {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            allowEdit: true,
            targetWidth: 300,
            targetHeight: 300,
        };
        this.camera.getPicture(options).then(imgData => {
            this.photo = 'data:image/jpeg;base64,' + imgData;
        }).catch(err => {
            console.log(err);
        });
    }
}
