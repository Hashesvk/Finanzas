import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CalculosService } from '../services/calculos.service';
import { interval } from 'rxjs';
import * as math from 'mathjs';
import { typeOf } from 'mathjs';
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface Inputs {
  valor: string,
  text: string
}
let bono = 0;
let cuponInteres = 0;
let cuota = 0;
let amort = 0;
let prima = 0;
let cok = 0;
let dias = 0;
let tasaInt = 0;
let tasaAn = 0;
let Escudo = 0;
let FlujoEmisor = 0;
let FlujoBonista = 0;
let FlujoAct = 0;
let FaxPlazo = 0;
let FactorConvexidad = 0;
let periodo = 0;
let aux = 0;
let aux2 = 1;
let valorInicial = 0;
let capitalizacion = 0;
let frecuencia = 0
let tea = 0;
let tes = 0;
let id_bono = 0;
let impuesto = 0;
let estructuracion = 0;
let colocacion = 0;
let valorComercial = 0;
let cavali = 0;
let flotacion = 0;
let prima2 = 0;
let precio = 0;
let duraciona = 0;
let duracionb = 0;
let convex = 0;
let data: number[] = [];
let data2: number[] = [];
let TCEAe = 0;
let TCEAb = 0;
@Component({
  selector: 'app-bonos',
  templateUrl: './bonos.component.html',
  styles: [
  ]
})


export class BonosComponent implements OnInit {
  templateInputs: Inputs[] = [
    {
      valor: "valor",
      text: "Valor"
    },

    {
      valor: "valorComercial",
      text: "Valor Comercial"

    },
    {
      valor: "tipoMoneda",
      text: "Tipo de Moneda"

    },
    {
      valor: "anio",
      text: "Numero de años"

    },
    {
      valor: "frecCupon",
      text: "Frecuencia de Cupon"

    },
    {
      valor: "dias",
      text: "dias por año"

    },
    {
      valor: "capitalizacion",
      text: "Capitalizacion"
    },
    {
      valor: "tipoTasa",
      text: "Tipo de tasa de interes"
    },
    {
      valor: "tasaInt",
      text: "Tasa de interes"
    },
    {
      valor: "tasaAnu",
      text: "Tasa anual"
    },
    {
      valor: "impuesto",
      text: "Impuesto a la renta"
    },
    {
      valor: "prima",
      text: "Prima"
    },
    {
      valor: "estructuracion",
      text: "Estructuracion"
    },
    {
      valor: "colocacion",
      text: "Colocacion"
    },
    {
      valor: "flotacion",
      text: "Flotacion"
    },
    {
      valor: "cavali",
      text: "Cavali"
    }
  ]


  submitted = false;
  public bonoForm !: FormGroup;
  public pruebaForm !: FormGroup;
  public resultadoForm !: FormGroup;

  private _apiurl = "http://localhost:3000/bonos"
  private _apiurl2 = "http://localhost:3000/facturas"
  private _apiurl3 = "http://localhost:3000/resultado"
  private _id = 0;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: ActivatedRoute, private service: CalculosService, private router2: Router) { }

  RegistrarBono() {
    console.log(this.bonoForm.value);


    this.http.post<any>(this._apiurl, this.bonoForm.value)
      .subscribe(
        {
          next: resp => {
            id_bono = resp.id;
            console.log(id_bono)
          },
          error: error => {
            alert("Ocurrió un error");
          }
        }
      )

  }

  async calculo() {


    frecuencia = this.service.frecuenciaCupon(this.bonoForm.value.frecCupon)

    capitalizacion = this.service.diasCapitalizacion(this.bonoForm.value.capitalizacion);

    periodo = this.service.periodo(this.bonoForm.value.
      anio, this.bonoForm.value.frecCupon);


    valorInicial = this.bonoForm.value.valor

    tasaInt = this.bonoForm.value.tasaInt;

    tea = this.service.tasaefectivaAnual(this.bonoForm.value.tipoTasa, tasaInt,

      capitalizacion, Number(this.bonoForm.value.dias));

    tes = this.service.tasaefectivaSemestral(tea, frecuencia, this.bonoForm.value.dias);

    dias = Number(this.bonoForm.value.dias);

    bono = valorInicial;

    cuota = this.service.cuota(valorInicial, periodo, tes);

    cuponInteres = this.service.interes(bono, tes);

    amort = this.service.amortizacion(cuota, cuponInteres);

    prima = 0;

    impuesto = this.bonoForm.value.impuesto

    cok = this.service.cok(Number(this.bonoForm.value.dias), this.bonoForm.value.tasaAnu, frecuencia);


    Escudo = this.service.escudo(cuponInteres, impuesto);

    FlujoAct = this.service.flujoAct(aux2, cok, cuota)


    aux = periodo;

    prima2 = this.bonoForm.value.prima;

    estructuracion = this.bonoForm.value.estructuracion
    colocacion = this.bonoForm.value.colocacion
    flotacion = this.bonoForm.value.flotacion
    cavali = this.bonoForm.value.cavali
    valorComercial = this.bonoForm.value.valorComercial


    FlujoEmisor = cuota;
    data = [-FlujoEmisor];
    FlujoBonista = cuota;
    data2 = [-FlujoBonista];

    this.pruebaForm.value.bono = math.round(bono, 2);
    this.pruebaForm.value.id_bono = id_bono;
    this.resultadoForm.value.id_bono = id_bono;
    this.pruebaForm.value.interes = math.round(cuponInteres, 2);
    this.pruebaForm.value.cuota = math.round(cuota, 2);
    this.pruebaForm.value.amort = math.round(amort, 2)
    this.pruebaForm.value.prima = math.round(prima, 2);
    this.pruebaForm.value.Escudo = math.round(Escudo, 2);
    this.pruebaForm.value.FlujoEmisor = math.round(FlujoEmisor, 2);
    this.pruebaForm.value.FlujoBonista = math.round(FlujoBonista, 2);
    this.pruebaForm.value.FlujoAct = math.round(FlujoAct, 2);

    FaxPlazo = this.service.faxplazo(FlujoAct, aux2, frecuencia, dias);
    this.pruebaForm.value.FaxPlazo = math.round(FaxPlazo,2);
    FactorConvexidad = math.round(this.service.fconvexidad(FlujoAct, aux2));
    this.pruebaForm.value.FactorConvexidad = FactorConvexidad;
   
    this.resultadoForm.value.frecuenciadeabono = frecuencia;
    this.resultadoForm.value.capitalizacion = capitalizacion;
    this.resultadoForm.value.periodos = periodo;
    this.resultadoForm.value.tea = math.round(tea, 2);
    this.resultadoForm.value.tes = math.round(tes, 2);
    this.resultadoForm.value.cok = math.round(cok, 2);


    duraciona = FlujoAct;
    duracionb = FaxPlazo;
    convex = FactorConvexidad;

    //this.resultadoForm.value.TCEABonista: [''],
    //this.resultadoForm.value.TCEAEmisor =


    this.service.Registrar(this.pruebaForm.value,this._apiurl2);


    for (let aux = periodo; aux > 1;) {
      aux2++;
      bono -= amort;
      cuponInteres = this.service.interes(bono, tes)
      amort = this.service.amortizacion(cuota, cuponInteres)
      Escudo = this.service.escudo(cuponInteres, impuesto)
      FlujoAct = this.service.flujoAct(aux2, cok, cuota);
      this.pruebaForm.value.bono = math.round(bono, 2);
      this.pruebaForm.value.interes = math.round(cuponInteres, 2);
      this.pruebaForm.value.cuota = math.round(cuota, 2);
      this.pruebaForm.value.amort = math.round(amort, 2)

      if (aux == 2) {
        prima = this.service.prima(bono, prima2);
        FlujoEmisor = cuota + prima;
        FlujoBonista = cuota + prima;
        FlujoAct = this.service.flujoAct(aux2, cok, cuota + prima);
        precio = this.service.VNA(cok, periodo, cuota, prima);
        this.resultadoForm.value.precio = math.round(precio, 2);
      }


      this.pruebaForm.value.FlujoAct = math.round(FlujoAct, 2);
      this.pruebaForm.value.prima = math.round(prima, 2);
      this.pruebaForm.value.Escudo = math.round(Escudo, 2);
      this.pruebaForm.value.FlujoEmisor = math.round(FlujoEmisor, 2);

      this.pruebaForm.value.FlujoBonista = math.round(FlujoBonista, 2)
      FaxPlazo = this.service.faxplazo(FlujoAct, aux2, frecuencia, dias);
      console.log(FaxPlazo);
      this.pruebaForm.value.FaxPlazo = math.round(FaxPlazo,2);

      FactorConvexidad = math.round(this.service.fconvexidad(FlujoAct, aux2),2);
      this.pruebaForm.value.FactorConvexidad = FactorConvexidad;

      this.resultadoForm.value.costesEmisor = math.round(this.service.costeInicialEmisor(estructuracion, colocacion, flotacion, cavali, valorComercial), 2);
      this.resultadoForm.value.costesBonista = math.round(this.service.costeInicialBonista(flotacion, cavali, valorComercial), 2);


      this.service.Registrar(this.pruebaForm.value,this._apiurl2);


        duraciona += FlujoAct;
        duracionb += FaxPlazo;
        convex += FactorConvexidad;
        data.push(-FlujoEmisor);
      data2.push(-FlujoBonista);
      
      await task(aux);
      aux--;
      
      if (aux == 1) {
        this.pruebaForm.reset();
        this.pruebaForm.value.id_usuario = this._id
        this.pruebaForm.value.FlujoEmisor = valorComercial - math.round(this.service.costeInicialEmisor(estructuracion, colocacion, flotacion, cavali, valorComercial), 2)
        this.pruebaForm.value.FlujoBonista = valorComercial + math.round(this.service.costeInicialBonista(flotacion, cavali, valorComercial), 2)

        data.unshift(this.pruebaForm.value.FlujoEmisor);
        data2.unshift(this.pruebaForm.value.FlujoBonista);

        this.resultadoForm.value.utilidad = math.round(this.pruebaForm.value.FlujoBonista - precio,2);
        this.resultadoForm.value.duracion = math.round(duracionb / duraciona,2);      
        this.resultadoForm.value.duracionmod=math.round(this.resultadoForm.value.duracion/(1+cok/100),2)
        convex = this.service.convexidad(convex, duraciona, cok, frecuencia, dias);
        this.resultadoForm.value.convexidad = math.round(convex, 2);
        this.resultadoForm.value.total =  math.round(convex + this.resultadoForm.value.duracion,2) 
        

        TCEAb= this.service.TCEABonista(this.service.tir(data), frecuencia, dias);
        TCEAe= this.service.TCEAEmisor(this.service.tir(data2), frecuencia, dias)

        this.resultadoForm.value.TCEABonista= math.round(TCEAb,2)
        this.resultadoForm.value.TCEAEmisor = math.round(TCEAe,2)

        this.service.Registrar(this.pruebaForm.value,this._apiurl2);

        alert("Calculo exitoso")
        this.pruebaForm.reset();
      }



    }
    this.service.Registrar(this.resultadoForm.value,this._apiurl3);

    async function task(i: any) { // 3
      await wait(700);
      console.log(`Task ${i} done!`);
    }

  }


  ngOnInit(): void {
    this._id = this.router.snapshot.params['id'];
    this.bonoForm = this.formBuilder.group({
      valor: [''],
      tipoMoneda: [''],
      valorComercial: [''],
      anio: [''],
      frecCupon: [''],
      dias: [''],
      capitalizacion: [''],
      tipoTasa: [''],
      tasaInt: [''],
      tasaAnu: [''],
      impuesto: [''],
      prima: [''],
      estructuracion: [''],
      colocacion: [''],
      flotacion: [''],
      cavali: [''],
      id_usuario: [this._id]
    })

    this.pruebaForm = this.formBuilder.group({
      bono: [''],
      id_bono: [''],
      id_usuario: [this._id],
      interes: [''],
      cuota: [''],
      amort: [''],
      prima: [''],
      Escudo: [''],
      FlujoEmisor: [''],
      FlujoBonista: [''],
      FlujoAct: [''],
      FaxPlazo: [''],
      FactorConvexidad: ['']
    })

    this.resultadoForm = this.formBuilder.group({
      id_bono: [''],
      id_usuario: [this._id],
      frecuenciadeabono: [''],
      capitalizacion: [''],
      periodos: [''],
      costesEmisor: [''],
      costesBonista: [''],
      tea: [''],
      tes: [''],
      cok: [''],
      precio: [''],
      utilidad: [''],
      duracion: [''],
      total: [''],
      convexidad: [''],
      duracionmod: [''],
      TCEABonista: [''],
      TCEAEmisor: ['']
    })

  }
} 
