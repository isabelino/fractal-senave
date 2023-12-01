import { Component, OnInit } from '@angular/core';
import { Bienes } from '../informe-ts/bienes';
import { InformesService } from '../informes.service';
import { pluck} from 'rxjs/operators';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Prod2 } from '../informe-ts/descripcion2';
import { Prod3 } from '../informe-ts/descripcion3';
import { ItemDetailsFilter } from '../informe-ts/itemDetailsFilter';
import { Funcionarios } from '../informe-ts/funcionarios';
import { ItemDetails2 } from '../informe-ts/ItemDetails2';
import { Prod } from '../informe-ts/descripcion';
import swal from 'sweetalert2';
import { Prod22 } from '../informe-ts/descripcion22';
import { InformesApiService } from '../informes-api.service';
import { ContadorData } from '../informe-ts/api_contador';
import { Info } from '../informe-ts/api_info_contador';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fc04model } from '../informe-ts/fc04/modelo_fc04';
import { itemsFc05 } from '../informe-ts/fc05/itemsFC05';
import { Funcionarios2 } from '../informe-ts/funcionarios2';
import { itemProveedor } from '../informe-ts/fc10/data_item_proveedor';
import { nameProvider } from '../informe-ts/fc10/data_name_proveedor';

interface reciboConta{
  "data": number;
}

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe-fc04',
  templateUrl: './informe-fc04.component.html'
})
export class InformeFc04Component implements OnInit {
public localizacion!:string;
public tipoInfo=true;
public valorInforme="total";
searchText:string="";
searchText2:string="";
searchTextProveedor:string="";
public contendorProveedor:itemProveedor[]=[];
public nombresProveedores:nameProvider[]=[];

public datofc04!:fc04model[];
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
public datofc05:itemsFc05[]= []
public modelofc05:itemsFc05={
  fecha: '',
  cuenta: '',
  nombre_cuenta: '',
  valor_unitario: 0,
  origen: '',
  saldo: 0,
  total: 0,
  numero_informe: 0,
  fecha_informe: '',
  month: '',
  year: ''
}

public infoGenerado:boolean=true;

numeroInforme:any;
newContador:ContadorData[]=[];
newInformeContador:Info = {
  informe:""
}
public arrayReturnConta:number[]=[];

public recibidoConta:number[]=[0];

public newContaRe:reciboConta={
  "data":0
}

public searchTextFuncionario04:string="";
public observaciones:string="";
public codigobien:string="";
public hoy = new Date();
public year = this.hoy.getFullYear();
public ImagePath: string= "";
public datoContador: string | null | undefined;
//public funcionarios : Funcionarios[] = [];
public funcionarios: Funcionarios2[] = [];
public datos :ItemDetailsFilter[] = [];
public datos2 :ItemDetails2[] = [];
public results2:ItemDetails2[] = [];
public results:ItemDetailsFilter[]=[]
public resultadoConsulta!: ItemDetailsFilter;
public totalGeneral:number=0;

 public IVA:number=0.1;

 public cantidadBienesLocalizado:number=0;
 public bienes : Bienes[] = [];
 public bien:Prod2[]=[];
 public bien2:Prod[]=[];
 public userName:any = "";
 public habilitarBoton:boolean=false;
 public repart!:string;
 public depend!:string;
 public repartText!:string;
 public dependText!:string;
 public nrofactura!:string;


 nuevo: Prod22={
   cuenta: "",
   nombre_cuenta: "",
   subcuenta: "",
   nombre_subcuenta: "",
   analitico1: "",
   nombre_analitico1: "",
   analitico2: "",
   nombre_analitico2: "",
   rotulo: "",
   descripcion: "",
   cantidad: "",
   valorUnitario: 0,
   valorTotal: 0,
   fecha: "",
   estado: "",
   vida_util: "",
   fecha_ingresada: "",
   factura: "",
   tipo: "",
   origen: "",
   signo: ""
 }
nuevoArray: Prod22[]=[];
nuevoResponsable: Prod3={
  nombre:"",
  cargo:""

}
nuevo2:Prod={
  nombre:"",
  cantidad:0,
  rotulo:"",
  vida_util:"",
  fecha:"",
  factura:"",
  tipo:""
};

 entidad!:string;
 unidad!:string;
 reparticion!:string;
 dependencia!:string;
 area!:string;
 lugar!:string;

 entidad2!:string;
 unidad2!:string;
 reparticion2!:string;
 dependencia2!:string;
 area2!:string;
 lugar2!:string;

 origen!:string;
 seleccionado!:string;

 entidadr!:string;
 unidadr!:string;
 reparticionr!:string;
 dependenciar!:string;
 arear!:string;
 lugarr!:string;
 seleccionador!:string;
 public datoItem:ItemDetailsFilter[]=[];
 public formato_fecha:string = "";
 public formato_fecha2:string = "";
  nuevoBien!:Prod2;
 public contador:number=0;
  repartText2!: string;
  repart2!: string;
  dependText2!: string;
  depend2!: string;


  constructor(private informeServices:InformesService,private apiService:InformesApiService,public router:Router, public _location: Location) {

  }

  guardar():void{

    this.nuevo={
      cuenta:"",
      nombre_cuenta:"",
      subcuenta:"",
      nombre_subcuenta:"",
      analitico1:"",
      nombre_analitico1:"",
      analitico2:"",
      nombre_analitico2:"",
      rotulo:this.nuevo2.rotulo,
      descripcion:"",
      cantidad:"1",
      valorUnitario:0,
      valorTotal:0,
      fecha:"",
      estado:"",
      vida_util:this.nuevo2.vida_util,
      fecha_ingresada:this.nuevo2.fecha,
      factura:this.nuevo2.factura,
      tipo: this.nuevo2.tipo,
      origen: 'C',
      signo: '',

    }


    console.log('esto es results:',this.results);

    console.log('esto es nuevo2:',this.nuevo2);


      for(let i = 0; i < this.results.length; i++) {

          this.formato_fecha="";
          this.formato_fecha2="";

          if(this.results[i] !== null){
            this.nuevo.cuenta = JSON.stringify( this.results[i].custom_fields_values[0].value).substring(1,6).replace(/['"]+/g, '');
            this.nuevo.nombre_cuenta = JSON.stringify(this.results[i].custom_fields_values[0].value).substring(6,this.results[i].custom_fields_values[0].value.length+1);
          }
          if(this.results[i].custom_fields_values[1].value !== null){
            this.nuevo.subcuenta = JSON.stringify(this.results[i].custom_fields_values[1].value).substring(6,8);
            this.nuevo.nombre_subcuenta = JSON.stringify(this.results[i].custom_fields_values[1].value).substring(8,this.results[i].custom_fields_values[1].value.length+1).replace(/['"]+/g, '');
          }
            if(this.results[i].custom_fields_values[2].value !== null){
              this.nuevo.analitico1 =JSON.stringify(this.results[i].custom_fields_values[2].value).substring(8,11);
              this.nuevo.nombre_analitico1 = JSON.stringify(this.results[i].custom_fields_values[2].value).substring(11,this.results[i].custom_fields_values[2].value.length+1).replace(/['"]+/g, '');
            }
            if(this.results[i].custom_fields_values[3].value !== null){
              this.nuevo.analitico2 =JSON.stringify(this.results[i].custom_fields_values[3].value).substring(10,12);
              this.nuevo.nombre_analitico2 = JSON.stringify(this.results[i].custom_fields_values[3].value).substring(12,this.results[i].custom_fields_values[3].value.length+1).replace(/['"]+/g, '');
            }



            this.nuevo.rotulo=this.codigobien;

            if(this.results[i].anual_depreciation !== null){
              if(JSON.stringify(this.results[i].anual_depreciation) === '25'){
                this.nuevo.vida_util="4";
              }
              if(JSON.stringify(this.results[i].anual_depreciation) === '10'){
                this.nuevo.vida_util="10";
              }

              if(JSON.stringify(this.results[i].anual_depreciation) === '2.5'){
                this.nuevo.vida_util="40";
              }

              if(JSON.stringify(this.results[i].anual_depreciation) === '20'){
                this.nuevo.vida_util="5";
              }


            }


          if(this.results[i].third_parties_name === null){
            this.observaciones= " ";
          }else{
            this.observaciones= JSON.stringify(this.results[i].third_parties_name);
          }


          this.nuevo.descripcion= JSON.stringify(this.results[i].description).replace(/['"]+/g, '');
          this.nuevo.cantidad="1";
          this.nuevo.valorUnitario= Number(this.results[i].total_cost);
          this.nuevo.valorTotal= Number(this.results[i].total_cost);


          this.formato_fecha = JSON.stringify(this.results[i].purchase_date).replace(/['"]+/g, '').replace(/['-]+/g, '');;
          console.log("fecha",this.formato_fecha);
          this.formato_fecha2 += this.formato_fecha.substring(6,9)+"-"+this.formato_fecha.substring(4,6)+"-"+this.formato_fecha.substring(0,4);
          this.nuevo.fecha=this.formato_fecha2;
          console.log("fecha formateada",this.nuevo.fecha);

          this.nuevo.fecha_ingresada=this.formato_fecha2

          this.nuevo.estado= JSON.stringify(this.results[i].custom_fields_values[4].value).replace(/['"]+/g, '');

          this.totalGeneral +=this.nuevo.valorUnitario;

        this.nuevoArray.push(this.nuevo);

        this.nuevo2.cantidad=1;


        this.nuevo2={
          nombre:"",
          cantidad:0,
          rotulo:"",
          vida_util:"",
          fecha:"",
          factura:"",
          tipo:""
        };

      }




    console.log("este es!!",this.nuevoArray);

    this.codigobien="";

  }




  ngOnInit(): void {


    this.infoGenerado=true;



    this.habilitarBoton=false;
    this.mostrarFuncionarios();
    this.mostrarDatos();
    this.mostrarDatos2();
    this.getProveedoresAll();

    this.ImagePath ="data:image/jpeg;base64,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"
  }

  changeType(e:any) {
    console.log(e.target.value);
  }

  eliminar( dato:number):void{

    this.totalGeneral -=this.nuevoArray[dato].valorUnitario;
    this.nuevoArray.splice(dato, 1);

}

  separarReparticion(){
    this.repartText= this.repart.substring(this.repart.indexOf("-")+1,this.repart.length);
    this.repart=this.repart.substring(0,this.repart.indexOf("-"));

    this.repartText2=this.repartText;
    this.repart2=this.repart;
    console.log("Reparticion texto:",this.repartText);
    console.log("Reparticion codigo:",this.repart);
  }
  separarDependencia(){

    this.dependText= this.depend.substring(this.depend.indexOf("-")+1,this.depend.length);
    this.depend=this.depend.substring(0,this.depend.indexOf("-"));

    this.dependText2=this.dependText;
    this.depend2=this.depend;
    console.log("Dependencia texto:",this.dependText);
    console.log("Dependencia codigo:",this.depend);

  }
  separarReparticion2(){
    this.repartText2= this.repart2.substring(this.repart2.indexOf("-")+1,this.repart2.length);
    this.repart2=this.repart2.substring(0,this.repart2.indexOf("-"));
    console.log("Reparticion texto2:",this.repartText2);
    console.log("Reparticion codigo2:",this.repart2);
  }
  separarDependencia2(){

    this.dependText2= this.depend2.substring(this.depend2.indexOf("-")+1,this.depend2.length);
    this.depend2=this.depend2.substring(0,this.depend2.indexOf("-"));
    console.log("Dependencia texto2:",this.dependText2);
    console.log("Dependencia codigo2:",this.depend2);

  }
  cambios(){
    if( this.nuevoResponsable.nombre.indexOf("-") === -1){

    }else{
      //alert("si tiene -");
      this.nuevoResponsable.cargo = this.nuevoResponsable.nombre.substring(this.nuevoResponsable.nombre.indexOf("-")+1,this.nuevoResponsable.nombre.length);
      this.nuevoResponsable.nombre= this.nuevoResponsable.nombre.substring(0,this.nuevoResponsable.nombre.indexOf("-"));

    }
  }

  mostrarBienes():void{
    this.informeServices.todosBienes().pipe(
      pluck('data')
    )
    .subscribe(data => {
      this.bienes=data;

    });
  }



  contadorInformes():void{
    this.apiService.contadorInformes().pipe(
      pluck('data')
    )
    .subscribe(data => {
      this.newContador=data;
    });
  }

  mostrarFuncionarios():void{
    this.informeServices.todosFuncionarios2().pipe(
      //pluck('data')
    )
    .subscribe(data => {
      this.funcionarios=data;
      console.log("fc04-funcionarios",this.funcionarios);
    });
  }

  mostrarDatos():void{
    swal({
      title: 'Cargando datos...',
      allowOutsideClick: false
    });

    swal.showLoading();



    this.informeServices.todosDatos3().pipe(
      pluck('data')

    )
    .subscribe( resp =>{
      this.datos=resp;
      console.log('bienes:',resp);
      swal.close();

    }

    );

    this.getContadorInformeS("fc04");
  }

  mostrarDatos2():void{

    this.informeServices.todosDatos2().pipe(
      pluck('data')

    )
    .subscribe( resp =>
      this.datos2=resp

    );
  }

  buscar(){

    let key: keyof ItemDetails2;

    for (key in this.resultadoConsulta){
      delete this.resultadoConsulta[key];
    }


    this.results=this.search(this.codigobien);
    this.resultadoConsulta = this.results[0];
    console.log("resultado de la locura",this.resultadoConsulta);
  }


  search( name:string) {
  let entry;

    return this.datos.filter(
      function(data){ return data.barcode == name }
  );
 }

 agregarDatoBuscado(){



    //this.totalGeneral=0;
    this.nuevo={
      cuenta:"",
      nombre_cuenta:"",
      subcuenta:"",
      nombre_subcuenta:"",
      analitico1:"",
      nombre_analitico1:"",
      analitico2:"",
      nombre_analitico2:"",
      rotulo:"",
      descripcion:"",
      cantidad:"",
      valorUnitario:0,
      valorTotal:0,
      fecha:"",
      estado:"",
      vida_util:"",
      fecha_ingresada:"",
      factura:"",
      tipo: "",
      origen: "C",
      signo: ""
    }
    //this.nuevoArray=[];

    console.log('esto es results:',this.results);
    //this.results= this.results2[0];

      for(let i = 0; i < this.results.length; i++) {

        this.nuevo={
          cuenta:"",
          nombre_cuenta:"",
          subcuenta:"",
          nombre_subcuenta:"",
          analitico1:"",
          nombre_analitico1:"",
          analitico2:"",
          nombre_analitico2:"",
          rotulo:"",
          descripcion:"",
          cantidad:"",
          valorUnitario:0,
          valorTotal:0,
          fecha:"",
          estado:"",
          vida_util:"",
          fecha_ingresada:"",
          factura:"",
          tipo: "",
          origen: 'C',
          signo: ''
        }
          this.formato_fecha="";
          this.formato_fecha2="";

          if(this.results[i] !== null){
            this.nuevo.cuenta = JSON.stringify( this.results[i].custom_fields_values[0].value).substring(1,6).replace(/['"]+/g, '');
            this.nuevo.nombre_cuenta = JSON.stringify(this.results[i].custom_fields_values[0].value).substring(6,this.results[i].custom_fields_values[0].value.length+1);
          }
          if(this.results[i].custom_fields_values[1].value !== null){
            this.nuevo.subcuenta = JSON.stringify(this.results[i].custom_fields_values[1].value).substring(6,8);
            this.nuevo.nombre_subcuenta = JSON.stringify(this.results[i].custom_fields_values[1].value).substring(8,this.results[i].custom_fields_values[1].value.length+1).replace(/['"]+/g, '');
          }
            if(this.results[i].custom_fields_values[2].value !== null){
              this.nuevo.analitico1 =JSON.stringify(this.results[i].custom_fields_values[2].value).substring(8,11);
              this.nuevo.nombre_analitico1 = JSON.stringify(this.results[i].custom_fields_values[2].value).substring(11,this.results[i].custom_fields_values[2].value.length+1).replace(/['"]+/g, '');
            }
            if(this.results[i].custom_fields_values[3].value !== null){
              this.nuevo.analitico2 =JSON.stringify(this.results[i].custom_fields_values[3].value).substring(10,12);
              this.nuevo.nombre_analitico2 = JSON.stringify(this.results[i].custom_fields_values[3].value).substring(12,this.results[i].custom_fields_values[3].value.length+1).replace(/['"]+/g, '');
            }


          this.nuevo.rotulo= JSON.stringify(this.results[i].barcode).replace(/['"]+/g, '');
          this.nuevo.descripcion= JSON.stringify(this.results[i].description).replace(/['"]+/g, '');
          this.nuevo.cantidad="1";
          this.nuevo.valorUnitario= Number(this.results[i].total_cost);
          this.nuevo.valorTotal= Number(this.results[i].total_cost);


          this.formato_fecha = JSON.stringify(this.results[i].purchase_date).replace(/['"]+/g, '').replace(/['-]+/g, '');;
          console.log("fecha",this.formato_fecha);
          this.formato_fecha2 += this.formato_fecha.substring(6,9)+"-"+this.formato_fecha.substring(4,6)+"-"+this.formato_fecha.substring(0,4);
          this.nuevo.fecha=this.formato_fecha2;
          console.log("fecha formateada",this.nuevo.fecha);

          this.nuevo.estado= JSON.stringify(this.results[i].custom_fields_values[4].value).replace(/['"]+/g, '');

          this.totalGeneral +=this.nuevo.valorUnitario;

        this.nuevoArray.push(this.nuevo);

      }




    console.log("este es",this.nuevoArray);
 }


getContadorInformeS(informe:string):void{


  this.apiService.getContadorInforme("fc04").pipe(
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
  generarInforme2(){


    const exs: { columns: ({ text: number,fontSize:5 } | { text: string,fontSize:5})[][]; }[][] = [];
    this.bien2.forEach(exp=>{

      exs.push([
        {
          columns:[

            [


             {

                text:exp.cantidad,fontSize:5
              },
              {

                text: exp.nombre,fontSize:5
              },

            ]

          ],

        }

      ]);

    });




     this.habilitarBoton=true;
     const desc: { columns: ( { text: string,fontSize:4 })[][]; }[][] = [];
     const cant: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const cuent: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const subcuent: { columns: ({ text:string, fontSize:4 })[][]; }[][] = [];
     const analit1: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const analit2: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const rotu: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const vunitario: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const vtotal: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const fecha: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const estad: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const name_cuenta: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const name_subcuenta: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const name_analitico1: { columns: ({ text: string,fontSize:4})[][]; }[][] = [];
     const name_analitico2: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const numero: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const espacio: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const vida_util: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const factura: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const fecha_ingresada: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const tipo: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const origen: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     const signo: { columns: ({ text: string,fontSize:4 })[][]; }[][] = [];
     this.nuevoArray.forEach(exp=>{


       name_cuenta.push([
         {
           columns:[

             [



               {

                 text: exp.nombre_cuenta,fontSize:4
               }
             ]

           ],

         }
       ],

       );

       name_subcuenta.push([
         {
           columns:[

             [



               {

                 text: exp.nombre_subcuenta,fontSize:4
               }
             ]

           ],

         }
       ],

       );

       name_analitico1.push([
         {
           columns:[

             [



               {

                 text: exp.nombre_analitico1,fontSize:4
               }
             ]

           ],

         }
       ],

       );

       name_analitico2.push([
         {
           columns:[

             [



               {

                 text: exp.nombre_analitico2,fontSize:4
               }
             ]

           ],

         }
       ],

       );

       desc.push([
         {
           columns:[

             [




               {

                 text: (exp.nombre_cuenta!=null ? exp.nombre_cuenta : " "),fontSize:4

               },
               {

                 text: (exp.nombre_subcuenta!=null ? exp.nombre_subcuenta : " "),fontSize:4

               },
               {

                 text: (exp.nombre_analitico1!=null || exp.nombre_analitico1==='""' ? exp.nombre_analitico1 : " "),fontSize:4

               },
               {

                 text: ( exp.nombre_analitico2 !=='' ? exp.nombre_analitico2 : "---------------------------------------------"),fontSize:4

               },
               {

                 text: (exp.descripcion!=null  || exp.descripcion==='""' ? exp.descripcion:" "),fontSize:4

               },
               {

                 text: '____________________________________________________',fontSize:4

               },

             ]

           ],

         }

       ]);

       cant.push([
         {
           columns:[

             [


              {

                 text:exp.cantidad,fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },

             ]

           ],

         }

       ]);
       cuent.push([
         {
           columns:[

             [


              {

                 text:(exp.cuenta !=='' ? exp.cuenta : "00"),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },


               {

                 text: '_______',fontSize:4

               },


             ],


           ],

         }

       ]);

       subcuent.push([
         {
           columns:[

             [



               {

                 text:'\n',fontSize:4
               },
              {

                 text:(exp.subcuenta !=='' ? exp.subcuenta : "00"),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },

               {

                 text: '_______',fontSize:4

               },
             ]

           ],

         }

       ]);

       analit1.push([
         {
           columns:[

             [


               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },

              {

                 text:(exp.analitico1 !==''? exp.analitico1 : "00"),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },

               {

                 text: '_______',fontSize:4

               },

             ]

           ],

         }

       ]);

       analit2.push([
         {
           columns:[

             [

               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:(exp.analitico2 !==''? exp.analitico2: "00"),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text: '_______',fontSize:4

               },



             ]

           ],

         }

       ]);

       rotu.push([
         {
           columns:[

             [


              {

                 text:exp.rotulo,fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },


             ]

           ],

         }

       ]);

       vunitario.push([
         {
           columns:[

             [


              {

                 text:exp.valorUnitario.toLocaleString("de-DE"),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },


             ]

           ],

         }

       ]);

       vtotal.push([
         {
           columns:[

             [


              {

                 text:exp.valorTotal.toLocaleString("de-DE"),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },


             ]

           ],

         }

       ]);

       fecha.push([
         {
           columns:[

             [


              {

                 text:(exp.fecha !== "--null" ? exp.fecha : " "),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },


             ]

           ],

         }

       ]);

       estad.push([
         {
           columns:[

             [


              {

                 text:(exp.estado != "null" ? exp.estado : " "),fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },
               {

                 text:'\n',fontSize:4
               },


             ]

           ],

         }

       ]);

       vida_util.push([
        {
          columns:[

            [


             {

                text:(exp.vida_util != "null" ? exp.vida_util: " "),fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },


            ]

          ],

        }

      ]);

      fecha_ingresada.push([
        {
          columns:[

            [


             {

                text:(exp.fecha_ingresada != "--null" ? exp.fecha_ingresada: " "),fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },


            ]

          ],

        }

      ]);

      factura.push([
        {
          columns:[

            [


             {

                text:(exp.factura != "null" ? exp.factura: " "),fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },


            ]

          ],

        }

      ]);
      tipo.push([
        {
          columns:[

            [


             {

                text:(exp.tipo != "null" ? exp.tipo: " "),fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },


            ]

          ],

        }

      ]);
      origen.push([
        {
          columns:[

            [


             {

                text:(exp.origen != "null" ? exp.origen: " "),fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },


            ]

          ],

        }

      ]);
      signo.push([
        {
          columns:[

            [


             {

                text:(exp.signo != "null" ? exp.signo: " "),fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },
              {

                text:'\n',fontSize:4
              },


            ]

          ],

        }

      ]);



     });


     const pdfInformeDefinition:any = {
      header: '',

      footer: {
        columns: [
          'Left part',
          { text:'1', alignment: 'right' }
        ]
      },
     content: [
       [{
         image: this.ImagePath,
         width: 150,
         height: 50,
       },[{text: '', style: 'header',alignment: 'left'}]],
       , [{text: ' MOVIMIENTO DE BIENES DE USO', style: 'subheader',alignment: 'center'}],
      , [,{text: '', style: 'header',alignment: 'right',fontSize:8},{text: 'FC-04                                         DEPENDENCIA REMITENTE                                                       DEPENDENCIA RECEPTORA                         Nro. : '+this.contador+"/"+this.year, style: 'header',alignment: 'left',fontSize:7}],
       {
         style: 'tableExample',
         table: {

          body: [

            [
                {
                      ul: [
                        {
                          style: 'tableExample',
                          table: {
                            headerRows: 1,
                            body: [
                              [{text: 'ENTIDAD', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                            ]
                          },listType: 'none'
                        },
                        {
                          style: 'tableExample',
                          table: {
                            headerRows: 1,
                            body: [
                              [{text: 'UNIDAD JERARQUICA', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                            ]
                          },listType: 'none'
                        },
                        {
                          style: 'tableExample',
                          table: {
                            headerRows: 1,
                            body: [
                              [{text: 'REPARTICION', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                            ]
                          },listType: 'none'
                        },
                        {
                          style: 'tableExample',
                          table: {
                            headerRows: 1,
                            body: [
                              [{text: 'DEPENDENCIA', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                            ]
                          },listType: 'none'
                        },
                        {
                          style: 'tableExample',
                          table: {
                            headerRows: 1,
                            body: [
                              [{text: 'AREA', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                            ]
                          },listType: 'none'
                        },
                        {
                          style: 'tableExample',
                          table: {
                            headerRows: 1,
                            body: [
                              [{text: 'LUGAR', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                            ]
                          },listType: 'none'
                        }


                      ],colSpan: 3},
                      {},{},
              { ul: [
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,

                    body: [
                      [{text: '23-18', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                    ]
                  },listType: 'none'
                },
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,

                    body: [
                      [{text: '', fontSize: 4,alignment: 'left',border: [false, false, false, false],margin:[0,0,0,4]}]
                    ]
                  },listType: 'none'
                },
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,

                    body: [
                      [{text: this.repart, fontSize: 4,alignment: 'left',border: [false, false, false, false],margin:[0,0,0,1]}]
                    ]
                  },listType: 'none'
                },
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,

                    body: [
                      [{text: this.depend, fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                    ]
                  },listType: 'none'
                },
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,

                    body: [
                      [{text: '', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                    ]
                  },listType: 'none'
                },
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,

                    body: [
                      [{text: '', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                    ]
                  },listType: 'none'
                },
                ],
              },{ ul: [
                {text: 'SERV. NAC. DE CALIDAD Y SANIDAD VEGETAL Y DE SEMILLAS', fontSize:4 ,alignment: 'left',listType: 'none',margin: [0, 0, 0, 2]},

                {text: this.unidad, fontSize: 4,alignment: 'left',listType: 'none',margin: [0, 0, 0, 6]},

                {text:this.repartText, fontSize: 4,alignment: 'left',listType: 'none',margin: [0, 0, 0, 2]},

                {text:this.dependText, fontSize: 4,alignment: 'left',listType: 'none',margin: [0, 0, 0, 2]},

                {text:this.area, fontSize: 4,alignment: 'left',listType: 'none',margin: [0, 0, 0, 2]},

                {text:this.lugar, fontSize: 4,alignment: 'left',listType: 'none',margin: [0, 0, 0, 2]},

                ]}


                  ,{ ul: [

                    {text: 'ORIGEN O MOVIMIENTO', fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]},
                    this.origen==="ALTA"?{text:'A..X..ALTA' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]}:{text:'A.....ALTA' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]},
                    this.origen==="BAJA"?{text: 'B..X..BAJA' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]}:{text: 'B.....BAJA' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]},
                    this.origen==="COMPRA"?{text:'C..X..COMPRA' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]}:{text:'C.....COMPRA' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]},
                    this.origen==="DONACIONES"?{text:'D..X..DONACIONES' , fontSize:5,listType: 'none',margin: [0, 0, 0, 2]}:{text:'D.....DONACIONES' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]},
                    this.origen==="TRANSPASO"?{text:'A..X..TRANSPASO' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]}:{text:  'A.....TRANSPASO' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]},
                    this.origen==="REPARACION"?{text:'RM..X..REPARACION MAYOR' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]}:{text:  'RM.....REPARACION MAYOR' , fontSize: 5,listType: 'none',margin: [0, 0, 0, 2]},
                  ],colSpan: 3},
                  {},{}
                , {

                  ul: [
                    {
                      style: 'tableExample',
                      table: {
                        headerRows: 1,

                        body: [
                          [{text: 'ENTIDAD', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                        ]
                      },listType: 'none'
                    },
                    {
                      style: 'tableExample',
                      table: {
                        headerRows: 1,

                        body: [
                          [{text: 'UNIDAD JERAQUICA', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                        ]
                      },listType: 'none'
                    },
                    {
                      style: 'tableExample',
                      table: {
                        headerRows: 1,

                        body: [
                          [{text: 'REPARTICION', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                        ]
                      },listType: 'none'
                    },
                    {
                      style: 'tableExample',
                      table: {
                        headerRows: 1,

                        body: [
                          [{text: 'DEPENDENCIA', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                        ]
                      },listType: 'none'
                    },
                    {
                      style: 'tableExample',
                      table: {
                        headerRows: 1,

                        body: [
                          [{text: 'AREA', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                        ]
                      },listType: 'none'
                    },
                    {
                      style: 'tableExample',
                      table: {
                        headerRows: 1,

                        body: [
                          [{text: 'LUGAR', fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                        ]
                      },listType: 'none'
                    },
                  ],colSpan: 3},
                  {},{}

                ,{ ul: [
                  {
                    style: 'tableExample',
                    table: {
                      headerRows: 1,

                      body: [
                        [{text: this.entidad, fontSize: 4,alignment: 'left',border: [false, false, false, false],margin: [0, 0, 0, 2]}]
                      ]
                    },listType: 'none'
                  },
                  {
                    style: 'tableExample',
                    table: {
                      headerRows: 1,

                      body: [
                        [{text: this.unidad , fontSize: 4,alignment: 'left',border: [false, false, false, false],margin: [0, 0, 0, 5]}]
                      ]
                    },listType: 'none'
                  },
                  {
                    style: 'tableExample',
                    table: {
                      headerRows: 1,

                      body: [
                        [{text: this.repart2+'-'+this.repartText2, fontSize: 4,alignment: 'left',border: [false, false, false, false],margin: [0, 0, 0, 1]}]
                      ]
                    },listType: 'none'
                  },
                  {
                    style: 'tableExample',
                    table: {
                      headerRows: 1,

                      body: [
                        [{text: this.depend2+'-'+this.dependText2, fontSize: 4,alignment: 'left',border: [false, false, false, false],margin: [0, 0, 0, 2]}]
                      ]
                    },listType: 'none'
                  },
                  {
                    style: 'tableExample',
                    table: {
                      headerRows: 1,

                      body: [
                        [{text: this.area, fontSize: 4,alignment: 'left',border: [false, false, false, false],margin: [0, 0, 0, 2]}]
                      ]
                    },listType: 'none'
                  },
                  {
                    style: 'tableExample',
                    table: {
                      headerRows: 1,

                      body: [
                        [{text: this.lugar, fontSize: 4,alignment: 'left',border: [false, false, false, false]}]
                      ]
                    },listType: 'none'
                  },
                ],colSpan: 5},
                {},{},{},{}
            ],

            [
              { text: 'CUENTA', fontSize: 4, alignment: 'center'},
              { text: 'SUB CUENTA', fontSize: 4, alignment: 'center'},
              { text: 'ANALITICO 1', fontSize: 4, alignment: 'center'},
              { text: 'ANALITICO 2', fontSize: 4, alignment: 'center'},
              { text: 'DESCRIPCION', fontSize: 4, alignment: 'center'},


              { text: 'FECHA', fontSize: 4, alignment: 'center'},
              { text: 'TIPO', fontSize: 4, alignment: 'center'},
              { text: 'Nº', fontSize: 4, alignment: 'center'},
              { text: 'ROTULADO', fontSize: 4, alignment: 'center'},
              { text: 'CANTIDAD', fontSize: 4, alignment: 'center'},
              { text: 'VALOR UNITARIO', fontSize: 4, alignment: 'center'},
              { text: 'VALOR TOTAL', fontSize: 4, alignment: 'center'},
              { text: 'SIGNO', fontSize: 4, alignment: 'center'},
              { text: 'FECHA DE INCORP. O MOVIM.', fontSize: 4, alignment: 'center'},
              { text: 'AÑOS DE VIDA UTIL', fontSize: 4, alignment: 'center'},
              { text: 'ORIGEN O MOVIM.', fontSize: 4, alignment: 'center'}
            ],
            [
              cuent,
              subcuent,
              analit1,
              analit2,
              desc,
              fecha,
              tipo,
              factura,
              rotu,
              cant,
              vunitario,
              vtotal,
              signo,
              fecha_ingresada,
              vida_util,
              origen
            ],

            [{ text: 'SUB TOTAL', fontSize: 5, alignment: 'right',colSpan: 11},
            {},{},{},{},{},{},{},{},{},{},
            { text: Math.round(this.totalGeneral).toLocaleString("de-DE"), fontSize: 5, alignment: 'left',colSpan: 5},
           {},{},{},{}],
           [{ text: 'I.V.A', fontSize: 5, alignment: 'right',colSpan: 11},
           {},{},{},{},{},{},{},{},{},{},
           { text: Math.round(this.totalGeneral*this.IVA).toLocaleString("de-DE"), fontSize: 5, alignment: 'left',colSpan: 5},
          {},{},{},{}],
            [{text: 'Obs: '+this.observaciones, fontSize: 5, alignment: 'lengh',colSpan: 9},{},{},{},{},{},{},{},{},{ text: 'TOTALES', fontSize: 5, alignment: 'right',colSpan: 2},
            {},
            { text: Math.round(this.totalGeneral+(this.totalGeneral*this.IVA)).toLocaleString("de-DE"), fontSize: 5, alignment: 'left',colSpan: 5},
           {},{},{},{}]

          ]
        }

       },
       {
         style: 'tableExample',
         table: {
           body: [
             [
              //[{ text: 'Recibí de conformidad los bienes detallados en el presente formulario' , fontSize: 6,margin: [0, 0, 0, 0] }],


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

               [{ text: '  Jefe de Patrimonio  ', fontSize: 8,decoration: 'overline',margin: [5, 45, 0, 0] }],


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



              [{ text: '  Jefe de Dependencia Receptora  ', fontSize: 8,decoration: 'overline',margin: [390, -20, 0, 0] }],



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




              [{ text: '   ', fontSize: 8,margin: [195, -50, 0, 0] }],

             ],
             [




               [{ text: '   ', fontSize: 8,margin: [200, -30, 0, 0] }],

              ],

           ]
         },
         layout: {
           defaultBorder: false,
         }
       },

     ]
     }


     const pdf = pdfMake.createPdf(pdfInformeDefinition);

     pdf.open();

     this.modelofc04={
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
      cuenta:'',
      itemsfc05:''
    }
    this.modelofc05={
      fecha: '',
      cuenta: '',
      nombre_cuenta: '',
      valor_unitario: 0,
      origen: '',
      saldo: 0,
      total: 0,
      numero_informe: 0,
      fecha_informe: '',
      month: '',
      year: ''
    }
    console.log("esto es lo que no funciona: ",String(this.nuevoArray));
    for (let i = 0; i < this.nuevoArray.length; i++) {
      this.modelofc05={
        fecha: '',
        cuenta: '',
        nombre_cuenta: '',
        valor_unitario: 0,
        origen: '',
        saldo: 0,
        total: 0,
        numero_informe: 0,
        fecha_informe: '',
        month: '',
        year: ''
      }

      //aqui debo guardar por cada item
      this.modelofc05={
        fecha: this.nuevoArray[i].fecha_ingresada,
        cuenta: this.nuevoArray[i].cuenta,
        nombre_cuenta: this.nuevoArray[i].nombre_cuenta,
        valor_unitario: this.nuevoArray[i].valorUnitario,
        origen: this.nuevoArray[i].origen,
        saldo: this.nuevoArray[i].valorUnitario,
        total: this.nuevoArray[i].valorTotal,
        numero_informe: 0,
        fecha_informe: '',
        month: '',
        year: ''
      }

      this.saveDataInformefc05(this.modelofc05);

      this.modelofc04={
        cont_informe:0,
        dependencia:String(this.dependText2),
        entidad:'23-18',
        entidad_text:'SERV. NAC. DE CALIDAD Y SANIDAD VEGETAL Y DE SEMILLAS',
        fecha_informe:'valor',
        items:String(JSON.stringify(this.nuevoArray)),
        iva:String(Math.round(this.totalGeneral*this.IVA).toLocaleString("de-DE")),
        nro_informe:String(this.contador)+"/"+String(this.year),
        observacion:String(this.observaciones),
        origen_movimiento:String(this.origen) ,
        reparticion:String(this.repart),
        reparticion_text:String(this.repartText2),
        sub_total:String(Math.round(this.totalGeneral).toLocaleString("de-DE")),
        totales:String(Math.round(this.totalGeneral+(this.totalGeneral*this.IVA)).toLocaleString("de-DE")),
        unidad_jerarquica:'valor',
        cuenta:String(this.nuevoArray[i].cuenta),
        itemsfc05:'{cuenta:'+String(this.nuevoArray[i].cuenta)+'},{nombre:'+String(this.nuevoArray[i].nombre_cuenta)+'},{tipo:'+String(this.nuevoArray[i].origen)+'},{valor:'+String(Math.round(this.totalGeneral).toLocaleString("de-DE"))+'},{fecha:"valor"}'
      }

    }
    this.saveDataInformefc04(this.modelofc04);

    this.nuevoArray=[];
    this.totalGeneral=0;

    this.nuevoInforme();

   }

   saveDataInformefc05(data:itemsFc05):void{
    this.apiService.saveInformefc05(data).pipe(
      pluck('status')
    )
    .subscribe(data => {
      console.log("nuevo informe fc05:",data);
    });

  }

   saveDataInformefc04(data:fc04model):void{
    this.apiService.saveInformefc04(data).pipe(
      pluck('status')
    )
    .subscribe(data => {
      console.log("nuevo informe fc04:",data);
    });

    this.infoGenerado=false;
  }

  tipoInforme(tipo:string):void{

    if(tipo==="total"){
      //this.nuevoInforme();
      //this.totalGeneral=0;
      //this.nuevoArray=[];
      console.log("total");
      this.tipoInfo = true;
      this.valorInforme="total";

    }else{
      console.log("parcial");
      this.totalGeneral=0;
      //this.nuevoArray=[];

      this.tipoInfo = false;
      this.valorInforme="parcial";
      //this.mostrarDatos2();

    }


  }



  getProveedoresAll():void{
    this.informeServices.todosProveedores().pipe(
      pluck('data')

    )
    .subscribe(data => {

      this.nombresProveedores=data;
      console.log("todos los proveedores:",this.nombresProveedores);

    });
  }

  getProveedoresFilter(nombre:string):void{
    this.informeServices.filtrarProveedores(nombre).pipe(
      pluck('data')

    )
    .subscribe(data => {

      this.contendorProveedor=data;
      console.log("proveedor buscado:",this.contendorProveedor);

    });
  }


  nuevoInformeR(){
    this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this.router.navigate([decodeURI(this._location.path())]);
      });

  }

  seleccionarProveedores2(){
    if(this.nombresProveedores.length !== 0){
      this.getProveedoresFilter(this.searchTextProveedor);
    }

  }

  seleccionarLocalizacion(){
    console.log("localizacion:",this.localizacion);
    this.cantidadBienesLocalizado=0;
    this.informeServices.filtrarBien2(this.localizacion).pipe(
     pluck('data')
   )
   .subscribe(data => {
     this.totalGeneral=0;
     this.nuevo={
       cuenta:"",
       nombre_cuenta:"",
       subcuenta:"",
       nombre_subcuenta:"",
       analitico1:"",
       nombre_analitico1:"",
       analitico2:"",
       nombre_analitico2:"",
       rotulo:"",
       descripcion:"",
       cantidad:"",
       valorUnitario:0,
       valorTotal:0,
       fecha:"",
       estado:"",
       origen:"",
       signo:"",
       factura:"",
       tipo:"",
       vida_util:"",
       fecha_ingresada:""
     }
     this.nuevoArray=[];

     console.log(data.length);
     this.cantidadBienesLocalizado= data.length;
     this.datoItem=data;
     //console.log(this.datoItem);

     //filtro por fecha
     if (this.searchText2.length > 0){
       //console.log("filtro por fecha:",this.datoItem.filter(arr => arr.purchase_date == this.searchText2).length);
       this.datoItem = this.datoItem.filter(arr => arr.purchase_date == this.searchText2);
       this.cantidadBienesLocalizado = this.datoItem.length;
     }
     //filtro por proveedor
     if(this.contendorProveedor.length>0){
       console.log("Esto es contendorProveedor",this.contendorProveedor);
       console.log("Esto es datoItem",this.datoItem);
       this.datoItem = this.datoItem.filter(arr => this.contendorProveedor.find(s => s.id_item == arr.id));
       console.log("filtrando por proveedor id_company",this.datoItem.length);
       console.log("filtrando por proveedor id_company",this.datoItem);

       this.cantidadBienesLocalizado = this.datoItem.length;
     }
     /*if(this.contendorProveedor.length>0){
       this.datoItem = this.datoItem.filter(arr =>
         for(let i = 0; i < this.contendorProveedor.length; i++) {
           arr.id_company == this.contendorProveedor[i].id_company
         }
       );
     }*/


     for (let i = 0; i < this.datoItem.length; i++) {

       this.nuevo={
         cuenta:"",
         nombre_cuenta:"",
         subcuenta:"",
         nombre_subcuenta:"",
         analitico1:"",
         nombre_analitico1:"",
         analitico2:"",
         nombre_analitico2:"",
         rotulo:"",
         descripcion:"",
         cantidad:"",
         valorUnitario:0,
         valorTotal:0,
         fecha:"",
         estado:"",
         origen:"",
         signo:"",
         factura:"",
         tipo:"",
         vida_util:"",
         fecha_ingresada:""
       }
       this.formato_fecha="";
       this.formato_fecha2="";

       console.log("iteracion",i);
       if(this.datoItem[i].custom_fields_values[0].value !==null){
         this.nuevo.cuenta = JSON.stringify( this.datoItem[i].custom_fields_values[0].value).substring(1,6).replace(/['"]+/g, '');
         this.nuevo.nombre_cuenta = JSON.stringify(this.datoItem[i].custom_fields_values[0].value).substring(6,this.datoItem[i].custom_fields_values[0].value.length+1);
       }
       this.nuevo.subcuenta = JSON.stringify(this.datoItem[i].custom_fields_values[1].value).substring(6,8);
       this.nuevo.nombre_subcuenta = JSON.stringify(this.datoItem[i].custom_fields_values[1].value).substring(8,this.datoItem[i].custom_fields_values[1].value.length+1).replace(/['"]+/g, '');
       this.nuevo.analitico1 =JSON.stringify(this.datoItem[i].custom_fields_values[2].value).substring(8,11);
       this.nuevo.nombre_analitico1 = JSON.stringify(this.datoItem[i].custom_fields_values[2].value).substring(11,this.datoItem[i].custom_fields_values[2].value.length+1).replace(/['"]+/g, '');
       if(this.datoItem[i].custom_fields_values[3].value !==null){
         this.nuevo.analitico2 =JSON.stringify(this.datoItem[i].custom_fields_values[3].value).substring(10,12);
         this.nuevo.nombre_analitico2 = JSON.stringify(this.datoItem[i].custom_fields_values[3].value).substring(12,this.datoItem[i].custom_fields_values[3].value.length+1).replace(/['"]+/g, '');
       }


       this.nuevo.rotulo= JSON.stringify(this.datoItem[i].barcode).replace(/['"]+/g, '');
       this.nuevo.descripcion= JSON.stringify(this.datoItem[i].description).replace(/['"]+/g, '');
       this.nuevo.cantidad="1";
       this.nuevo.valorUnitario= Number(this.datoItem[i].total_cost);
       this.nuevo.valorTotal= Number(this.datoItem[i].total_cost);

       if (this.datoItem[i].purchase_date != null){
         this.formato_fecha = JSON.stringify(this.datoItem[i].purchase_date).replace(/['"]+/g, '').replace(/['-]+/g, '');;
         console.log("fecha",this.formato_fecha);
         this.formato_fecha2 += this.formato_fecha.substring(6,9)+"-"+this.formato_fecha.substring(4,6)+"-"+this.formato_fecha.substring(0,4);
         this.nuevo.fecha=this.formato_fecha2;
         console.log("fecha formateada",this.nuevo.fecha);
       }
       if (this.datoItem[i].custom_fields_values[4].value != null){
         this.nuevo.estado= JSON.stringify(this.datoItem[i].custom_fields_values[4].value).replace(/['"]+/g, '');
       }
       this.totalGeneral +=this.nuevo.valorUnitario;

       this.nuevoArray.push(this.nuevo);

     }


     console.log("este es",this.nuevoArray);

   },err => {
     console.log('HTTP Error', err)
   }
   );
  }
}
