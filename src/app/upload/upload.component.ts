import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MediaService} from '../services/media.service';
import {Media} from '../models/media';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  file = new Media('');
  formData = new FormData();  // uusi formdata objecti

  constructor(private mediaService: MediaService, formData: FormData) { }

  setFile(evt) {
    console.log(evt.target.files[0]);
    const file: File = evt.target.files[0];
    // lisää tiedosto formData-objecktiiin
      this.formData.append('file', file);
  }

  uploadFile () {
    // tekstikenttien sisältö formData-objektiin
      this.formData.append('title', this.file.title);
      this.formData.append('description', this.file.description);
      // lähetä tiedot
      this.mediaService.uploadMedia(localStorage.getItem('token'), this.formData).
      subscribe(response => {
        console.log(response);
        // siirry front sivulle sekunnin kuluttua
          setTimeout(() => {
            this.router.navigate(['front']);
          }, 1000);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
