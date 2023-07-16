export interface ItemDetails {

  id:                               number;
  active:                           boolean;
  code:                             string;
  description:                      string;
  id_type_item:                     number;
  barcode:                          string;
  field_1:                          string;
  field_2:                          null | string;
  field_3:                          null | string;
  field_4:                          Field | null;
  field_5:                          string;
  field_6:                          Field;
  notes:                            null | string;
  min_stock_warning:                boolean;
  weight:                           null;
  is_serial_control:                boolean;
  lead_time:                        null;
  items_types_description:          ItemsTypesDescription;
  groups_description:               string;
  groups_1_description:             string;
  groups_2_description:             string;
  custom_fields_groups_description: CustomFieldsGroupsDescription;
  units_description:                null;
  priorities_description:           PrioritiesDescription;
  parent_description:               string;
  purchase_date:                    null;
  total_cost:                       number | null;
  anual_depreciation:               number | null;
  startup_date:                     Date | null;
  total_replacement_cost:           null;
  salvage_value:                    null;
  costs_center_description:         string;
  budgets_description:              string;
  cost_average:                     null;
  latitude:                         null;
  longitud:                         null;
  groups_tasks_description:         null;
  units_code:                       null;
  custom_fields_values:             CustomFieldsValue[];
  third_parties_name:               null;
  id_parent:                        number;
  visible_to_all:                   boolean;
  hours_average_daily_use:          null;
  available:                        boolean;
  initial_date_out_of_service:      null;
  last_final_date_available:        null;
  item_url:                         string;
  id_company:                       number;
}

export enum CustomFieldsGroupsDescription {
  FormularioPersonalizado = "FORMULARIO PERSONALIZADO",
}

export interface CustomFieldsValue {
  id_item:              number;
  //label_name:           LabelName;
  label_name:           string;
  id_company:           number;
  id_custom_field:      number;
  id_custom_field_type: number;
  value:                Value;
  position_field:       number;
}

export enum LabelName {
  Analitico1 = "Analitico 1",
  Analitico2 = "Analitico 2",
  Cuenta = "Cuenta",
  SubCuenta = "Sub cuenta",
}

export enum Value {
  Empty = "",
  The26105001099001Mouse = "26105001099001 Mouse",
  The261050199OtrosEquiposDigitalesPInf = "261050199 otros equipos digitales p/inf",
  The2610502MaquinasAnalogicasParaInformatica = "2610502 maquinas analogicas para informatica",
  The26105EquiposDeComputacion = "26105 Equipos de computacion",
  The26112001019007MetálicaAsientoYRespEnCuerina = "26112001019007 Metálica, Asiento y Resp en Cuerina",
  The26112001019027SillaGiratoriaTapizadaEnCuerina = "26112001019027 Silla Giratoria Tapizada en Cuerina",
  The261120119Sillas = "261120119 Sillas ",
  The2611201MobiliariosYEnseresDeOficina = "2611201 mobiliarios y enseres de oficina",
  The2611205OtrosMueblesYEnseres = "2611205 otros muebles y enseres",
  The26112MueblesYEnseres = "26112 Muebles  y enseres",
}

export enum Field {
  EquiposDeComputacion = "EQUIPOS DE COMPUTACION",
  EquiposDeSaludYLaboratorio = "EQUIPOS DE SALUD Y LABORATORIO",
  EquiposDeTransporte = "EQUIPOS DE TRANSPORTE",
  FieldMUEBLESYENSERES = "MUEBLES  Y ENSERES",
  HerramientasAparatosYEquiposVarios = "HERRAMIENTAS APARATOS Y EQUIPOS VARIOS",
  HerramientasYAparatosVarios = "HERRAMIENTAS Y APARATOS VARIOS",
  MaquinasYEquiposDeOficina = "MAQUINAS Y EQUIPOS DE OFICINA",
  MueblesYEnseres = "MUEBLES Y ENSERES",
}

export enum ItemsTypesDescription {
  Equipments = "EQUIPMENTS",
}

export enum PrioritiesDescription {
  Medium = "MEDIUM",
}
