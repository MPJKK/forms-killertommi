import { Component, OnInit } from '@angular/core';
import { User} from '../models/user';
import {MediaService} from '../services/media.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User('', '', '');

  constructor(private mediaService: MediaService) {
  }

  register() {  // metodi
    console.log(this.user);
    this.mediaService.newUser(this.user).subscribe(response => {
      // kuunnellaan consolessa vastausta
        console.log(response);
        // käsitellään talulukkona
        localStorage.setItem('token', response['token']);
        this.mediaService.login(this.user);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      });
  }

  ngOnInit() {
  }

}
