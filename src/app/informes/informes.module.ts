import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeFc04Component } from './informe-fc04/informe-fc04.component';
import { InformeFc10Component } from './informe-fc10/informe-fc10.component';
import { InformesComponent } from './informes.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InformeFc05Component } from './informe-fc05/informe-fc05.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InformeFc06Component } from './informe-fc06/informe-fc06.component';
import { InformeSearchComponent } from './informe-search/informe-search.component';
import { InformeFc03Component } from './informe-fc03/informe-fc03.component';
import { InformeValoresContablesComponent } from './informe-valores-contables/informe-valores-contables.component';




@NgModule({
  declarations: [
    InformeFc04Component,
    InformeFc10Component,
    InformesComponent,
    InformeFc05Component,
    InformeFc03Component,
    InformeFc06Component,
    InformeSearchComponent,
    InformeValoresContablesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    PdfViewerModule
  ],
  exports:[
    InformeFc04Component,
    InformeFc10Component,
    InformeFc05Component,
    InformeFc03Component,
    InformeSearchComponent
  ]
})
export class InformesModule { }
