import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


export class Bono {
  constructor(
    public id: number,
    public id_bono: string,
    public bono: string,
    public interes: string,
    public cuota: string,
    public amort: string,
    public prima: string,
    public Escudo: string,
    public FlujoEmisor: string,
    public FlujoBonista: string,
    public FlujoAct: string,
    public FaxPlazo: string,
    public FactorConvexidad: string
  )
  {
  }
}
export class Resultado {
  constructor(
    public id: number,
    public id_bono: string,
    public id_usuario: string,
    public frecuenciadeabono: string,
    public capitalizacion: string,
    public periodos: string,
    public tea: string,
    public tes: string,
    public cok: string,
    public precio: string,
    public convexidad: string,
    public costesEmisor: string,
    public costesBonista: string,
    public utilidad: string,
    public duracion: string,
    public total: string,
    public duracionmod: string,
    public TCEABonista: string,
    public TCEAEmisor: string


  )
  {
  }
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {

  bonos: Bono[] = [];
  resultados: Resultado[] = [];

  private _id = 0;

  constructor( private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this._id = this.router.snapshot.params['id'];
    this.getBonos();
    this.getResultados();
  }

  getBonos() {
    this.http.get<any>("http://localhost:3000/facturas").subscribe(
      {
        next: resp => {
          
            this.bonos = resp.filter((x: any) => x.id_usuario == this._id)
            console.log(resp);         
        },
        error: error => {
          alert("Ocurrió un error");
        }
      }
    )
  }

  getResultados() {
    this.http.get<any>("http://localhost:3000/resultado").subscribe(
      {
        next: resp => {
          
            this.resultados = resp.filter((x: any) => x.id_usuario == this._id)
            console.log(resp);         
        },
        error: error => {
          alert("Ocurrió un error");
        }
      }
    )
  }
}
