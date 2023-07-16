import { NgModule } from '@angular/core';
import { InformeFc04Component } from 'src/app/informes/informe-fc04/informe-fc04.component';
import { InformeFc10Component } from 'src/app/informes/informe-fc10/informe-fc10.component';
import { RouterModule, Routes } from '@angular/router';
import { InformesComponent } from 'src/app/informes/informes.component';
import { InformeFc05Component } from 'src/app/informes/informe-fc05/informe-fc05.component';
import { InformeFc03Component } from 'src/app/informes/informe-fc03/informe-fc03.component';
import { InformeFc06Component } from 'src/app/informes/informe-fc06/informe-fc06.component';
import { InformeSearchComponent } from 'src/app/informes/informe-search/informe-search.component';



const routes: Routes = [

  {
    path:'',
    component: InformesComponent,
    pathMatch:'full'
  },
  {
    path:'fc03',
    component: InformeFc03Component
  },
  {
    path:'fc04',
    component: InformeFc04Component
  },
  {
    path:'fc05',
    component: InformeFc05Component
  },
  {
    path:'fc06',
    component: InformeFc06Component
  },
  {
    path:'fc10',
    component: InformeFc10Component
  },
  {
    path:'fcSearch',
    component: InformeSearchComponent
  },

  {
    path: '**',
    redirectTo:''
  }
];

@NgModule({
  imports:[
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
