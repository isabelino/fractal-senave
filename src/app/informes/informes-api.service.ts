import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Info } from './informe-ts/api_info_contador';
import { fc03model } from './informe-ts/fc03/modelo_fc03';
import { fc04model } from './informe-ts/fc04/modelo_fc04';
import { fc10model } from './informe-ts/fc10/modelo_fc10';
import { itemsFc05 } from './informe-ts/fc05/itemsFC05';

@Injectable({
  providedIn: 'root'
})
export class InformesApiService {

  constructor(private http:HttpClient) {}

  private baseapiUrl: string = 'http://localhost:5000/api/v2/';
  //private baseapiUrl: string = 'https://senave.apisgateway.duckdns.org/api/v1.0/';
  //private baseapiUrl: string = 'http://192.168.10.249:5000/api/v1.0/';
  //private baseapiUrl: string = 'https://senave-apiv2.dr2gsistemas.duckdns.org/api/v2/'


  contadorInformes(): Observable<any>{
    const url = `${ this.baseapiUrl}contadores`;
    return this.http.get<any>(url).pipe(
      map( (response) => response as any )
    );
  }

  getContadorInforme(informe:string): Observable<any>{
    const urlget = `${ this.baseapiUrl}contador/${informe}`;
    return this.http.get<any>(urlget).pipe(
      map( (response) => response as any )
    );
  }

  getContadorYearInforme(informe:string): Observable<any>{
    const urlget = `${ this.baseapiUrl}year/${informe}`;
    return this.http.get<any>(urlget).pipe(
      map( (response) => response as any )
    );
  }

  saveContadorInforme(info:Info):Observable<any>{
    const header= {'content-type':'application/json'};
    const urlpost = `${ this.baseapiUrl}contador/new`;
    return this.http.post<any>(urlpost,info,{'headers':header});
  }

  saveInformefc03(model:fc03model):Observable<any>{
    const header2= {'content-type':'application/json'};
    const urlpost2 = `${ this.baseapiUrl}fc03/new`;
    return this.http.post<any>(urlpost2,model,{'headers':header2});
  }

  getfc03():Observable<any>{
    const urlget3 = `${ this.baseapiUrl}fc03/date/2023-03-15`;
    return this.http.get<any>(urlget3).pipe(
      map( (response) => response as any )
    );
  }

  getAllfc03():Observable<any>{
    const urlget3 = `${ this.baseapiUrl}fc03/all`;
    return this.http.get<any>(urlget3).pipe(
      map( (response) => response as any )
    );
  }

  saveInformefc04(model:fc04model):Observable<any>{
    const header2= {'content-type':'application/json'};
    const urlpost2 = `${ this.baseapiUrl}fc04/new`;
    return this.http.post<any>(urlpost2,model,{'headers':header2});
  }

  saveInformefc05(model:itemsFc05):Observable<any>{
    const header05= {'content-type':'application/json'};
    const urlpost05 = `${ this.baseapiUrl}fc05/new`;
    return this.http.post<any>(urlpost05,model,{'headers':header05});
  }



  getAllfc04():Observable<any>{
    const urlget3 = `${ this.baseapiUrl}fc04/all`;
    return this.http.get<any>(urlget3).pipe(
      map( (response) => response as any )
    );
  }
  getAllfc04Items():Observable<any>{
   // const header3= {'content-type':'application/text'};
    const urlget33 = `${ this.baseapiUrl}fc04/items`;
    return this.http.get<any>(urlget33).pipe(
      map( (response) => response as any )
    );
  }

  getAllfc05Items(m:string,y:string):Observable<any>{
    // const header3= {'content-type':'application/text'};
     const urlget35 = `${ this.baseapiUrl}fc05/items/${m}/${y}`;
     return this.http.get<any>(urlget35).pipe(
       map( (response) => response as any )
     );
   }

   getAllfc05ItemSum(m:string,y:string):Observable<any>{
    // const header3= {'content-type':'application/text'};
     const urlget36 = `${ this.baseapiUrl}fc05/sumitem/${m}/${y}`;
     return this.http.get<any>(urlget36).pipe(
       map( (response) => response as any )
     );
   }

   getAllfc06Items(y:string):Observable<any>{
    // const header3= {'content-type':'application/text'};
     const urlget355 = `${ this.baseapiUrl}fc06/items/${y}`;
     return this.http.get<any>(urlget355).pipe(
       map( (response) => response as any )
     );
   }

   getAllfc06ItemSum(y:string):Observable<any>{
    // const header3= {'content-type':'application/text'};
     const urlget366 = `${ this.baseapiUrl}fc06/sumitem/${y}`;
     return this.http.get<any>(urlget366).pipe(
       map( (response) => response as any )
     );
   }


  saveInformefc10(model:fc10model):Observable<any>{
    const header2= {'content-type':'application/json'};
    const urlpost2 = `${ this.baseapiUrl}fc10/new`;
    return this.http.post<any>(urlpost2,model,{'headers':header2});
  }


  getAllfc10():Observable<any>{
    const urlget3 = `${ this.baseapiUrl}fc10/all`;
    return this.http.get<any>(urlget3).pipe(
      map( (response) => response as any )
    );
  }

}
