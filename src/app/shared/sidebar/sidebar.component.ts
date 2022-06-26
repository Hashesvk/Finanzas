import { Component } from '@angular/core';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'
  ]
})
  

  
  
export class SidebarComponent {

  templateMenu: MenuItem[] = [
    {
      texto: 'bonos',
      ruta: '../bonos'
    },
    {
      texto: 'resultados',
      ruta: '../resultados'}
  ]
}
