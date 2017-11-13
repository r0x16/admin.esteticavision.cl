import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  invalidAnimate = false;
  loading = false;
  errorlogin = {
    active: false,
    message: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginform = new FormGroup({
      email: new FormControl('esteticavision.cl@gmail.com', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('meveoyveobien', [
        Validators.required
      ])
    });
    this.loginform.valueChanges.subscribe(() => this.invalidAnimate = false );
  }

  get email() { return this.loginform.get('email'); }
  get password() { return this.loginform.get('password'); }

  async login() {
    if (this.loginform.invalid) {
      this.invalidAnimate = true;
      return;
    }
    const data = this.loginform.value;

    try {
      const logged = await this.auth.login(data.email, data.password);
      if (logged) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.invalidAnimate = true;
      this.showResponseError(error);
    }

  }

  showResponseError(error: HttpErrorResponse) {
    this.errorlogin.active = true;

    if (error.status === 401) {
      this.errorlogin.message = 'Verifique sus credenciales y vuelva a intentarlo';
    }else if (error.status === 403) {
      this.errorlogin.message = 'No tiene permiso para acceder a esta aplicación';
    }else {
      this.errorlogin.message = 'Ha ocurrido un error intentando conectarse con la aplicación.';
    }
  }

}
