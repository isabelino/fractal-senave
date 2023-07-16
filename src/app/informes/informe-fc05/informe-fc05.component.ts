import { Component, OnInit } from '@angular/core';
import { Bienes } from '../informe-ts/bienes';
import { InformesService } from '../informes.service';
import { pluck} from 'rxjs/operators';
import { ItemDetailsFilter } from '../informe-ts/itemDetailsFilter';
import * as pdfMake from "pdfmake/build/pdfmake";
import { modeloFC05 } from '../informe-ts/datosfc05';
import { Info } from '../informe-ts/api_info_contador';
import { InformesApiService } from '../informes-api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { fc04model } from '../informe-ts/fc04/modelo_fc04';
import { Prod22 } from '../informe-ts/descripcion22';
import { itemsFc04 } from '../informe-ts/fc04/items_fc04';
import { itemsFc05 } from '../informe-ts/fc05/itemsFC05';
import { Console } from 'console';
import { itemsFc04Final } from '../informe-ts/fc04/items_fc04_final';
import { itemSumFc05 } from '../informe-ts/fc05/itemSumFc05';

@Component({
  selector: 'app-informe-fc05',
  templateUrl: './informe-fc05.component.html'
})

export class InformeFc05Component implements OnInit {
  public totalGeneral:number=0;
  public listaRecibidafc05:itemSumFc05[]=[];
  public dato:string="";
  public dato2:string="";
  public dato3:string="";
  public list_array:object[]=[];
  public list_array2:object[]=[];

  public list_cuenta:string[]=[];
  public list_nombre_cuenta:string[]=[];
  public saldo_anterior:number=0;
  public compra:number=0;
  public total:number=0;
  public list_compra:string[]=[];
  public list_alta:string[]=[];
  public list_transpaso:string[]=[];
  public list_donacion:string[]=[];
  public list_total:string[]=[];

  public itemsFC05:itemsFc05[]=[];

  public itemsFc04final:itemsFc04Final[]=[];
  public itemsFC04:itemsFc04[]=[];
  public itemsFC042:itemsFc04[]=[];
  public modelfc04list:fc04model[]=[];
  public modelfc04list2:fc04model[]=[];

  public modelofc04:fc04model={
    cont_informe: 0,
    dependencia: '',
    entidad: '',
    entidad_text: '',
    fecha_informe: '',
    items: '',
    iva: '',
    nro_informe: '',
    observacion: '',
    origen_movimiento: '',
    reparticion: '',
    reparticion_text: '',
    sub_total: '',
    totales: '',
    unidad_jerarquica: '',
    cuenta: '',
    itemsfc05: ''
  }

  public itemsRecibido2: Prod22[] = [];
  public nuevoArray2: Prod22[]=[];

  public datofc04!:fc04model[];
  public copydatofc04!:fc04model[];
  public infoGenerado:boolean=true;

  newInformeContador:Info = {
    informe:""
  }
  public contador:number=0;
  contaCuenta:number=0;
  cuentaRepetida:string="";
  cuentaNombreRepetida:string="";

  public bienes : Bienes[] = [];
  public datos1 :ItemDetailsFilter[] = [];
  public ImagePath: string= "";
  public yearSelect!:string;
  public monthSelect!:string;
  public bienesFiltrados : ItemDetailsFilter[] = [];

  public modelo:modeloFC05[] =[];

  public modeloFinal:modeloFC05[] =[];

  public new_modelo:modeloFC05={
    cuenta: '',
    nombre_cuenta: '',
    saldo: 0,
    total: 0
  }

  public final_modelo:modeloFC05={
    cuenta: '',
    nombre_cuenta: '',
    saldo: 0,
    total: 0
  }





  constructor(private informeServices:InformesService,private apiService:InformesApiService,public router:Router, public _location: Location) { }

  ngOnInit(): void {

    this.infoGenerado=true;
    this.getContadorInformeS("fc05");

    this.ImagePath ='data:image/jpeg;base64,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';''



  }



  /*saveContadorInformef(info:Info):void{
    this.apiService.saveContadorInforme(info).pipe(
      pluck('status')
    )
    .subscribe(data => {
      console.log("nuevo informe:",data);
    });

    this.infoGenerado=false;
  }*/

  getContadorInformeS(informe:string):void{


    this.apiService.getContadorInforme("fc05").pipe(
      pluck('data')

    )
    .subscribe(data => {

     this.contador=Number(data)+1;

    });

  }

  nuevoInforme(){
    this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this.router.navigate([decodeURI(this._location.path())]);
      });

  }

  getAllfc04():void{
    this.apiService.getAllfc04Items().pipe(
    //pluck('data')

    )
    .subscribe(data => {
      console.log(typeof(data));
      this.dato = data;

      this.dato = this.dato.split("'").join('');
      this.dato = "["+this.dato + "]";

      console.log(this.dato);

      console.log(JSON.parse(this.dato));


      console.log("-------------------------------------------")

      this.itemsFc04final= JSON.parse(this.dato);


      this.itemsFc04final.forEach(item=>{
        console.log(item.cuenta);
      });
      let result = this.itemsFc04final.filter((item,index)=>{
        return this.itemsFc04final.indexOf(item) === index;
      })
      console.log(result);

    });
  }

  public mostrarMes(mes:string):string{
    const mesSeleccionado = mes;

    switch ( mesSeleccionado) {
      case "1":
        return "Enero";
        break;
      case "2":
        return "Febrero";
        break;
      case "3":
        return "Marzo";
        break;
      case "4":
        return "Abril";
        break;
      case "5":
        return "Mayo";
        break;
      case "6":
        return "Junio";
        break;
      case "7":
        return "Julio";
        break;
      case "8":
        return "Agosto";
        break;
      case "9":
        return "Septiembre";
        break;
      case "10":
        return "Octubre";
        break;
      case "11":
        return "Noviembre";
        break;
      case "12":
        return "Diciembre";
        break;
      default:
        return "";
        break;
    }

  }

  generarInformeF05(){





    this.apiService.getAllfc05Items(this.monthSelect,this.yearSelect).pipe(
      pluck('data')
      ).subscribe(data => {
        //console.log("purete1; ",data);
        this.listaRecibidafc05 = data;
        //console.log("purete2; ",this.listaRecibidafc05);

        this.saldo_anterior =0;
        this.compra=0;
        this.total=0;

        this.listaRecibidafc05.forEach(e=>{
          this.saldo_anterior += e.saldo_anterior;
          this.compra += e.valor_total;
          this.total += e.valor_final;
        })



        const cuenta: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const nombre_cuenta: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const saldo_anterior: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const compra: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const alta: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const baja: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const transpaso: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const donacion: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const origen: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];
        const total: { columns: ({ text: string,fontSize:7 })[][]; }[][] = [];

        this.listaRecibidafc05.forEach(exp=>{
          cuenta.push([
            {
              columns:[

                [

                  {

                    text: exp.cuenta,fontSize:7
                  }
                ]

              ],

            }
          ]
          );

          nombre_cuenta.push([
            {
              columns:[

                [

                  {

                    text: exp.nombre_cuenta,fontSize:7
                  }
                ]

              ],

            }
          ],

          );
          saldo_anterior.push([
            {
              columns:[

                [

                  {

                    text: String(Math.round(Number(exp.saldo_anterior)).toLocaleString("de-DE")),fontSize:7
                  }
                ]

              ],

            }
          ],

          );
          total.push([
            {
              columns:[

                [

                  {

                    text: String(Math.round(exp.valor_final).toLocaleString("de-DE")),fontSize:7
                  }
                ]

              ],

            }
          ],

          );

          origen.push([
            {
              columns:[

                [

                  {

                    text: exp.origen,fontSize:7
                  }
                ]

              ],

            }
          ],

          );

          compra.push([
            {
              columns:[

                [

                  {

                    text: (exp.origen === "C" ? String(Math.round(Number(exp.valor_total)).toLocaleString("de-DE")): "0"),fontSize:7
                  }
                ]

              ],

            }
          ],

          );

          alta.push([
            {
              columns:[

                [

                  {

                    text: (exp.origen === "A" ? String(Math.round(Number(exp.valor_total)).toLocaleString("de-DE")): "0"),fontSize:7
                  }
                ]

              ],

            }
          ],



          );

          baja.push([
            {
              columns:[

                [

                  {

                    text: (exp.origen === "B" ? String(Math.round(Number(exp.valor_total)).toLocaleString("de-DE")): "0"),fontSize:7
                  }
                ]

              ],

            }
          ],



          );

          transpaso.push([
            {
              columns:[

                [

                  {

                    text: (exp.origen === "T" ? String(Math.round(Number(exp.valor_total)).toLocaleString("de-DE")): "0"),fontSize:7
                  }
                ]

              ],

            }
          ],



          );

          donacion.push([
            {
              columns:[

                [

                  {

                    text: (exp.origen === "D" ? String(Math.round(Number(exp.valor_total)).toLocaleString("de-DE")): "0"),fontSize:7
                  }
                ]

              ],

            }
          ],



          );


        });


        this.apiService.getAllfc05ItemSum(this.monthSelect,this.yearSelect).pipe(
          pluck('data')
          ).subscribe(data => {
            this.totalGeneral = data;


          const pdfInformeDefinition:any = {
            content: [
              [{
                image: this.ImagePath,
                width: 70,
                height: 60,
                  },[{text: '', style: 'header',alignment: 'left'}]],
                  , [{text: ' CONSOLIDACION DE BIENES DE USO', style: 'subheader',alignment: 'center'}],
                  , [,{text: '', style: 'header',alignment: 'right',fontSize:8},{text: `                                                                                                                                                                           Hoja Nº. : 1`, style: 'header',alignment: 'right',fontSize:7}],
                , [,{text: '', style: 'header',alignment: 'right',fontSize:8},{text: 'Entidad: Servicio Nacional de Calidad y Sanidad Vegetal y de Semillas(SENAVE)                                         MES: '+this.mostrarMes(this.monthSelect)+'              AÑO:'+this.yearSelect+'                     ',style: 'header',alignment: 'left',fontSize:7},
                ,{text: 'FC05',style: 'header',alignment: 'left',fontSize:7}],
              {
                style: 'tableExample',
                table: {
                  body: [
                    [
                      [{text: 'CUENTA', style: 'header',alignment: 'center',fontSize:7,colSpan: 3},
                      {},{}],
                      [{text: 'NOMBRE DE LA CUENTA', style: 'header',alignment: 'center',fontSize:7}],
                      [{text: 'SALDO ANTERIOR', style: 'header',alignment: 'center',fontSize:7}],
                      [{text: 'COMPRA', style: 'header',alignment: 'center',fontSize:7}],
                      [{text: 'ALTA', style: 'header',alignment: 'center',fontSize:7}],
                      [{text: 'BAJA', style: 'header',alignment: 'center',fontSize:7}],
                      [{text: 'TRANSPASO', style: 'header',alignment: 'center',fontSize:7}],
                      [{text: 'DONACION', style: 'header',alignment: 'center',fontSize:7}],
                      [{text: 'TOTAL', style: 'header',alignment: 'center',fontSize:7}],

                    ],

                    /*[{text: '(1)',fontSize:7,alignment: 'center'},{text: '(2)',fontSize:7,alignment: 'center'},{text: '(3)',fontSize:7,alignment: 'center'},{text: '(4)',fontSize:7,alignment: 'center'},{text: '(5)',fontSize:7,alignment: 'center'},{text: '(6)',fontSize:7,alignment: 'center'},{text: '(7)',fontSize:7,alignment: 'center'},{text: '(8)',fontSize:7,alignment: 'center'},{text: '(9)',fontSize:7,alignment: 'center'}],*/
                    //['(1)','(2)','(3)','(4)','(5)','(6)','(7)','(8)','(9)'],
                    [cuenta,nombre_cuenta,saldo_anterior,compra,alta,baja,transpaso,donacion,total],
                    [{ text: 'TOTAL', fontSize: 9, alignment: 'right',colSpan: 2},

                    { },
                    {text: Math.round(this.saldo_anterior).toLocaleString("de-DE"), fontSize: 7, alignment: 'left'},{text: Math.round(this.compra).toLocaleString("de-DE"), fontSize: 7},{text: '0', fontSize: 7},{text: '0', fontSize: 7},{text: '0', fontSize: 7},{text: '0', fontSize: 7},{text: Math.round(this.total).toLocaleString("de-DE"), fontSize: 7, alignment: 'left'}],
                  ]
                }

              },

              {
                style: 'tableExample',
                table: {
                  body: [
                    [
                    [{ text: 'Observación: este formulario registra la mayorización de valores del inventario inicial (valor de origen) y de los movimientos de bienes' , fontSize: 10,margin: [0, 0, 0, 0] }],

                    ],
                  ]
                },
                layout: {
                  defaultBorder: false,
                }
              },
              ,
            {
              style: 'tableExample',
              table: {
                body: [
                  [


                    /*[{ text: 'OBSERVACION:' , fontSize: 6,margin: [0, 0, 0, 0] },{ text: 'DEVUELTO EN:', fontSize: 8,margin: [390, 35, -30, 0] }],
                    */

                    [{ text: '  Jefe de Patrimonio de la entidad  ', fontSize: 8,decoration: 'overline',margin: [5, 45, 0, 0] }],


                  ],
                ]
              },
              layout: {
                defaultBorder: false
              }
            },

            {
              style: 'tableExample',
              table: {
                body: [

                  [



                    /*[{text:'Lugar:',fontSize: 6,margin: [390, -5, 0, 0] },
                    {text:'Fecha:',fontSize: 6,margin: [390,4 , 0, 0] },{text:'Responsable de recepción:',fontSize: 6,margin: [390, 4, 0, 0] }],
                    */

                  ],
                ]
              },
              layout: {
                defaultBorder: false,
              }
            },
            {
              style: 'tableExample',
              table: {
                body: [
                  [



                    [{ text: '  Director Gral. de Administración y Finanzas  ', fontSize: 8,decoration: 'overline',margin: [390, -20, 0, 0] }],

                    /* [{ text: 'ENTREGADO EN:', fontSize: 8,margin: [5, -45, 0, 0],alignment: 'left'},{text:'Lugar:',fontSize: 6,margin: [5, 4, 0, 0] },
                    {text:'Fecha: ',fontSize: 6,margin: [5,4 , 0, 0] }],*/


                  ],
                ]
              },
              layout: {
                defaultBorder: false
              }
            }


            ]
          }

          const pdf = pdfMake.createPdf(pdfInformeDefinition);
          pdf.open();

        });

      }
    );






  }


}
