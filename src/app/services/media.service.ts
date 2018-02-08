import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import {parseHttpResponse} from 'selenium-webdriver/http';
import {Router} from '@angular/router';
import {Login} from '../models/login';

@Injectable()
export class MediaService {

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  logged = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAllMedia() {
    return this.http.get(this.apiUrl + '/media');
  }

  newUser(user) { // tehdään uusi metodi
    return this.http.post(this.apiUrl + '/users', user);
  }

  getNew() { // vain 10 ensimmäistä kuvaa
    return this.http.get(this.apiUrl + '/media?limit=10');
  }

  login(user) {
    this.http.post<Login>(this.apiUrl + '/login', user).subscribe(response => {
      // homma ok -> fronttiin
      this.logged = true;
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      // homma kusee -> loginiin
      this.router.navigate(['login']);
    });
  }

  getUserData(token) {
    const options = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get(this.apiUrl + '/users/user', options);
  }
  uploadMedia(token, fd) {
    const options = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.post(this.apiUrl + '/media', fd, options);
  }
}
