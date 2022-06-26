import { Component, OnInit } from '@angular/core';
import { CargarscriptService } from '../cargarscript.service'
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public signupForm !: FormGroup;
  public signinForm !: FormGroup;
  public submitted = false;
  public submitted2 = false;

  private _apiurl = "http://localhost:3000/signupUsers"
  constructor(private formBuilder: FormBuilder, private _CargaScripts: CargarscriptService, private http: HttpClient, private router: Router) {

    _CargaScripts.carga(["app"])

  }

  Registrar() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return
    }
    console.log("Iniciar");
    console.log(this.signupForm.value);
    this.http.post<any>(this._apiurl, this.signupForm.value).subscribe(
    
      {
        next: resp => {
          alert("Registro exitoso");
          this.signupForm.reset();
          this.router.navigate([`template/${resp.id}`]);

        },
        error: error => {
          alert("Registro erroneo");
        }
      }
    )

  }

  Iniciar() {
    this.submitted2 = true;
    if (this.signinForm.invalid) {
      return
    }
    this.http.get<any>(this._apiurl)
    .subscribe(
    
      {
        next: resp => {
          const user = resp.find((a: any) => {
            return a.nombre == this.signinForm.value.nombre && a.contraseña == this.signinForm.value.contraseña
          });
          if (user) {
            alert("Ingreso exitoso");
            this.signinForm.reset();
            this.router.navigate([`template/${user.id}`]);  
          }
          else {
            alert("Usuario no encontrado");
            this.signinForm.reset();
          }
        },
        error: error => {
          alert("Ocurrió un error");
        }
      }
    )
    
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      contraseña:['',Validators.required]
    })
    this.signinForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      contraseña:['',Validators.required]
    })    
  }
  
}
