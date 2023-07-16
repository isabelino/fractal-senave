export interface ItemDetailsFilter{

  id:                               number;
  active:                           boolean;
  code:                             string;
  description:                      string;
  id_type_item:                     number;
  barcode:                          string;
  field_1:                          string;
  field_2:                          string;
  field_3:                          null;
  field_4:                          null;
  field_5:                          string;
  field_6:                          Field6;
  notes:                            null | string;
  min_stock_warning:                boolean;
  weight:                           null;
  is_serial_control:                boolean;
  lead_time:                        null;
  items_types_description:          ItemsTypesDescription;
  groups_description:               string;
  groups_1_description:             string;
  groups_2_description:             Groups2_Description;
  custom_fields_groups_description: CustomFieldsGroupsDescription;
  units_description:                null;
  priorities_description:           PrioritiesDescription;
  parent_description:               string;
  purchase_date:                    null;
  total_cost:                       null;
  anual_depreciation:               null;
  startup_date:                     null;
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
  label_name:           LabelName;
  id_company:           number;
  id_custom_field:      number;
  id_custom_field_type: number;
  value:                string;
  position_field:       number;
}

export enum LabelName {
  Analitico1 = "Analitico 1",
  Analitico2 = "Analitico 2",
  Cuenta = "Cuenta",
  SubCuenta = "Sub cuenta",
}

export enum Field6 {
  EquiposDeComputacion = "EQUIPOS DE COMPUTACION",
  MueblesYEnseres = "MUEBLES Y ENSERES",
}

export enum Groups2_Description {
  MaquinasNumericasODigitalesParaInformatica = "MAQUINAS NUMERICAS O DIGITALES PARA INFORMATICA",
  MobilariosYEnseresDeOficina = "MOBILARIOS Y ENSERES DE OFICINA",
}

export enum ItemsTypesDescription {
  Equipments = "EQUIPMENTS",
}

export enum PrioritiesDescription {
  Medium = "MEDIUM",
}
