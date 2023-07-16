import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AppRoutingModule } from './app-routing/app-routing/app-routing.module';
import { InformesModule } from './informes/informes.module';
import {HttpClientModule} from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    AppSidebarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InformesModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
