import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  atan2, chain, derivative, e, evaluate, log, number, pi, pow, round, sqrt
} from 'mathjs'
import * as math from 'mathjs';

const { irr } = require('node-irr')

@Injectable({
  providedIn: 'root'
})




export class CalculosService {

  constructor(private http: HttpClient) {


  }

  amortizacion(cuota: number, interes: number) {

    return cuota - interes;

  }

  interes(vnominal: number, tasaefectiva: number) {

    return vnominal * tasaefectiva / 100;

  }

  bono(amortizacion: number, vnominal: number) {
    //es el numero de factura

    return vnominal - amortizacion;
  }

  cuota(vnominal: number, periodo: number, interes: number) {
    //funciona
    let cuota = 0;
    pow([[-1, 2], [3, 1]], 2)
    const aux = pow(1 + interes / 100, periodo);
    cuota = interes / 100 * Number(aux);
    cuota = cuota / (Number(aux) - 1);
    cuota *= vnominal;
    return cuota;

  }

  periodo(anio: number, frecuencia: string) {

    let periodo = 0
    switch (frecuencia) {
      case frecuencia = "mensual":
        periodo = anio * 12;
        break;
      case frecuencia = "bimestral":
        periodo = anio * 6;
        break;
      case frecuencia = "trimestral":
        periodo = anio * 4;
        break;
      case frecuencia = "cuatrimestral":
        periodo = anio * 3;
        break;
      case frecuencia = "semestral":
        periodo = anio * 2;
        break;
      case frecuencia = "anual":
        periodo = anio * 1;
        break;
    }

    return periodo;
  }

  periodoxAño(anio: number, frecuencia: string) {

    let periodo = 0
    switch (frecuencia) {
      case frecuencia = "mensual":
        periodo = 12;
        break;
      case frecuencia = "bimestral":
        periodo = 6;
        break;
      case frecuencia = "trimestral":
        periodo = 4;
        break;
      case frecuencia = "cuatrimestral":
        periodo = 3;
        break;
      case frecuencia = "semestral":
        periodo = 2;
        break;
      case frecuencia = "anual":
        periodo = 1;
        break;
    }

    return periodo;
  }

  prima(bono: number, prima: number) {

    return bono * prima/100;

  }

  escudo(cupon: number, renta: number) {
    return cupon * renta/100;
  }

  frecuenciaCupon(frecuencia: string) {

    let dias = 0
    switch (frecuencia) {
      case frecuencia = "mensual":
        dias = 30;
        break;
      case frecuencia = "bimestral":
        dias = 60;
        break;
      case frecuencia = "trimestral":
        dias = 90;
        break;
      case frecuencia = "cuatrimestral":
        dias = 120;
        break;
      case frecuencia = "semestral":
        dias = 180;
        break;
      case frecuencia = "anual":
        dias = 360;
        break;
    }

    return dias;
  }

  diasCapitalizacion(capitalizacion: string) {
    let dias = 0
    switch (capitalizacion) {
      case capitalizacion = "mensual":
        dias = 30;
        break;
      case capitalizacion = "bimestral":
        dias = 60;
        break;
      case capitalizacion = "trimestral":
        dias = 90;
        break;
      case capitalizacion = "cuatrimestral":
        dias = 120;
        break;
      case capitalizacion = "semestral":
        dias = 180;
        break;
      case capitalizacion = "anual":
        dias = 360;
        break;
    }

    return dias;
  }

  tasaefectivaAnual(tipo:string, interes:number, capitalizacion: number, diasxaño: number) { 
    let tasa = 0;

    if (tipo == "efectiva") {
      tasa = interes;
      return tasa;
    }
    else {

      tasa = (interes / 100)
      tasa = 1+ tasa/(diasxaño / capitalizacion)
      tasa = Number(pow(tasa, (diasxaño / capitalizacion)));
      tasa -= 1;
      console.log(tasa);

      return tasa*100;
    }
    
  }
  
  tasaefectivaSemestral(tasaAnual: number, frecuencia: number, diasxaño: number) {

    let tasa = 0;

    tasa = Number(pow((1 + tasaAnual/100), frecuencia / diasxaño));
    tasa -= 1;

    return tasa*100;
  }


  costeInicialEmisor(estructuracion: number, colocacion:number, flotacion:number, cavali:number, valorComercial:number) {
    
    estructuracion += colocacion + flotacion + cavali
    console.log(estructuracion)

    return valorComercial*(estructuracion/100)
  }

  costeInicialBonista(flotacion:number, cavali:number, valorComercial:number) {
    
    flotacion += cavali
    console.log(flotacion)
    return valorComercial*(flotacion/100)
  }

  flujoAct(periodo:number, cok: number, cuota:number ) {
    
    let flujo = 0

    flujo = Number(pow(1+cok/100, periodo))
    flujo = cuota/flujo

    return flujo
  }

  cok(dias:number, tasaDescuento:number, frecuencia:number) {
    
    let cok = 0
        
    cok= Number(pow((1+tasaDescuento/100), frecuencia /dias))-1

  
    cok *= 100;
    return  cok;

  }

  VNA(cok:number, periodo:number, cuota:number, prima:number) {
    let vna = 0;
    let j=0
    for (let i = 1; i < periodo; i++)
    {
      vna += cuota/(Number(pow((1 + cok/100), i)));
      j = i;
      console.log(vna)
      console.log(j)
    }
    let aux = 0;
    aux = (cuota + prima)
    console.log(vna)
    console.log(aux)
    vna += aux/(Number(pow((1 + cok/100), j+1)));
    return vna;
  }
  faxplazo(flujoact:number, plazo: number, frecuencia:number, dias:number) {
    
    let fax = 0

    fax = Number(flujoact*plazo*(frecuencia/dias))

    return fax
  }

  fconvexidad(flujoact:number, plazo: number) {
    let fcon = 0

    fcon = Number(flujoact*plazo*(1+plazo))

    return fcon
  }

  convexidad(factor:number, flujoact:number, cok:number, frecuencia:number, dias:number ) {
    
    let convex = 0;

    convex = factor / (Number(pow(1 + cok / 100, 2)) * flujoact * Number(pow(dias / frecuencia, 2)));

    return convex;

  }

  tir(data: number[]) {

    console.log(data)
    console.log(irr(data))
    return irr(data)
  }

  TCEAEmisor(tir:number, frecuencia:number, dias:number) {
    
    let tcea = 0;
    tcea = (Number(pow(1 + tir, dias / frecuencia)))-1
    console.log(tcea)
    tcea *=100
    return tcea;

  }

  TCEABonista(tir:number, frecuencia:number, dias:number) {
    let tcea = 0;
    tcea = (Number(pow(1 + tir, dias / frecuencia)))-1
    console.log(tcea)
    tcea *=100
    return tcea;
  }

  Registrar(data: string[], api: string) {

    this.http.post<any>(api, data)
    .subscribe(
      {
        next: () => {

        },
        error: () => {
          alert("Ocurrió un error");
        }
      }
    )

  }
}

