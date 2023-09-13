import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor(private http:HttpClient) { }

  //trae todos los bienes
  //private apiUrl: string = 'https://localhost/pruebaphp/conexionPHPFracttal.php';
  private apiUrl: string = 'https://newmanagement.com.py/conexionPHPFracttal.php';

  //trae todos los funcionarios
  private apiUrl2: string = 'https://newmanagement.com.py/conexionPHPFracttal2.php';
  //private apiUrl2: string = 'https://localhost/pruebaphp/conexionPHPFracttal2.php';

  //trae items_custom_fields
    private apiUrl3: string = 'https://newmanagement.com.py/conexionPHPFracttal3.php';
    //private apiUrl3: string = 'https://localhost/pruebaphp/conexionPHPFracttal3.php';

  //trae items_details
    private apiUrl4: string = 'https://newmanagement.com.py/conexionPHPFracttal4.php';
   // private apiUrl4: string = 'https://localhost/pruebaphp/conexionPHPFracttal4.php';

   private apiUrl5: string = 'https://newmanagement.com.py/conexionPHPFracttal5.php';
   // private apiUrl4: string = 'https://localhost/pruebaphp/conexionPHPFracttal4.php';



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('E3cjZizbS0oLpXrPjlF2:e1XYO7lSNBavQeRq1yLwZZO9POrPqM0maOXvp6oZImDKudnT5RFPOJ')
    })
  };



  filtrarBien(codigo:string):Observable<any>{
    const url5 = `${ this.apiUrl5 }/?location_code=${codigo}`;
    return this.http.get<any>(url5).pipe(
      map( (response) => response as any )
    );
}
private urlFinalFiltroPatrimonial:string = "https://app.fracttal.com/api/items_details";

filtroBienPatrimonial(codigo:string):Observable<any>{


  const urlP = `${ this.urlFinalFiltroPatrimonial }/?barcode=${codigo}`;
  return this.http.get<any>(urlP,{ headers: this.httpOptions.headers}).pipe(
    map( (response) => response as any )
  );
}

  private urlFinalFiltroBien:string = "https://app.fracttal.com/api/items_details";
  filtrarBien2(codigo:string):Observable<any>{
    const url5 = `${ this.urlFinalFiltroBien }/?location_code=${codigo}`;
    return this.http.get<any>(url5,{ headers: this.httpOptions.headers}).pipe(
      map( (response) => response as any )
    );
  }
 private urlTodosBienes:string="https://app.fracttal.com/api/items";

  todosBienes(): Observable<any>{

    return this.http.get<any>(this.urlTodosBienes,{ headers: this.httpOptions.headers}).pipe(
      map( (response) => response as any )
    );
  }


  todosFuncionarios(): Observable<any>{
    const url2 = `${ this.apiUrl2 }`;
    return this.http.get<any>(url2).pipe(
      map( (response) => response as any )
    );
  }

  //private urlFinalFuncionarios:string = "https://app.fracttal.com/api/personnel";
  private urlFinalFuncionarios:string ="http://192.168.10.155:8081/funcionarios";

  private headerfuncionario= {'content-type':'application/json'};
  todosFuncionarios2(): Observable<any>{
    console.log("esto tambien");
    return this.http.get<any>(this.urlFinalFuncionarios,{ headers: this.headerfuncionario}).pipe(
      map( (response) => response as any )
    );
    /*return this.http.get<any>(this.urlFinalFuncionarios,{ headers: this.httpOptions.headers}).pipe(
      map( (response) => response as any )
    );*/
  }

  todosDatos1(): Observable<any>{
    const url3 = `${ this.apiUrl3 }`;
    return this.http.get<any>(url3).pipe(
      map( (response) => response as any )
    );
  }

  private urlFinal:string = "https://app.fracttal.com/api/items_details?item_type=1";

  todosDatos2(): Observable<any>{
    //const url3 = `${ this.apiUrl3 }`;
    return this.http.get<any>(this.urlFinal,{ headers: this.httpOptions.headers}).pipe(
      map( (response) => response as any )
    );
  }

  private urlFinalDato:string = "https://app.fracttal.com/api/items_details";

  todosDatos3(): Observable<any>{
    console.log("aqui");
    return this.http.get<any>(this.urlFinalDato,{ headers: this.httpOptions.headers}).pipe(
      map( (response) => response as any )
    );
  }

  private urlFinalFiltroProvider:string = "https://app.fracttal.com/api/items_third_parties";
  filtrarProveedores(nombre:string):Observable<any>{
    console.log("servicio filtro proveedor");
    const url5 = `${ this.urlFinalFiltroProvider }/?third_parties_name=${nombre}`;
    return this.http.get<any>(url5,{ headers: this.httpOptions.headers}).pipe(
      map( (response) => response as any )
    );
  }

  private urlFinalAllProvider:string = "https://app.fracttal.com/api/third_parties";
  todosProveedores():Observable<any>{
    console.log("servicio filtro proveedor");
    const url5 = `${ this.urlFinalAllProvider }`;
    return this.http.get<any>(url5,{ headers: this.httpOptions.headers}).pipe(
      map( (response) => response as any )
    );
  }



}
