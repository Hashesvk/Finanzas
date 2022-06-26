import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonosComponent } from './bonos/bonos.component';
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'bonos', component: BonosComponent },
      { path: 'resultados', component: ResultadosComponent },
      { path: '**', redirectTo: 'bonos'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TemplateRoutingModule { }
