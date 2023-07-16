export interface Bienes {

  id:                               number;
  is_changed:                       boolean;
  id_parent:                        number | null;
  id_group_task:                    number | null;
  parent_id_type_item:              number | null;
  id_company:                       number;
  id_type_item:                     number;
  id_priority:                      number | null;
  active:                           boolean;
  code:                             null | string;
  description:                      string;
  barcode:                          null | string;
  field_1:                          string;
  field_2:                          null | string;
  field_3:                          null | string;
  field_4:                          null | string;
  field_5:                          null | string;
  field_6:                          null | string;
  id_group:                         number | null;
  id_group_1:                       number | null;
  id_group_2:                       null;
  notes:                            Notes | null;
  min_stock_warning:                boolean | null;
  weight:                           number | null;
  id_unit:                          number | null;
  is_serial_control:                boolean;
  is_tool:                          boolean;
  lead_time:                        number | null;
  id_custom_field_group:            number | null;
  items_types_description:          ItemsTypesDescription;
  groups_description:               null | string;
  groups_1_description:             null | string;
  groups_2_description:             null;
  custom_fields_groups_description: null | string;
  units_description:                UnitsDescription | null;
  priorities_description:           null | string;
  parent_description:               string;
  path_image:                       null | string;
  purchase_date:                    Date | null;
  total_cost:                       number | null;
  anual_depreciation:               number | null;
  startup_date:                     Date | null;
  total_replacement_cost:           number | null;
  salvage_value:                    number | null;
  id_third_party:                   number | null;
  third_parties_name:               null | string;
  leaf:                             boolean;
  id_cost_center:                   null;
  costs_center_description:         string;
  id_budget:                        null;
  budgets_description:              string;
  cost_average:                     number | null;
  last_date_out:                    Date | null;
  custom_fields_values:             CustomFieldsValue[] | null;
  latitude:                         null | string;
  longitud:                         null | string;
  groups_tasks_description:         null | string;
  id_item:                          number;
  units_code:                       UnitsCode | null;
  visible_to_all:                   boolean;
  hours_average_daily_use:          number | null;
  available:                        boolean;
  last_final_date_available:        Date | null;
  initial_date_out_of_service:      null;
}

export interface CustomFieldsValue {
  id_item:              number;
  label_name:           string;
  id_company:           number;
  id_custom_field:      number;
  id_custom_field_type: number;
  value:                string;
  position_field:       number;
}

export enum ItemsTypesDescription {
  Equipments = "EQUIPMENTS",
  Facilities = "FACILITIES",
  SparePartsAndSupplies = "SPARE_PARTS_AND_SUPPLIES",
  Tools = "TOOLS",
}

export enum Notes {
  AsignadoAAnaBenitez = "Asignado a Ana Benitez",
  AsignadoAGabrielCuba = "Asignado a Gabriel Cuba",
  AsignadoARodrigoOrtiz = "Asignado a Rodrigo Ortiz",
  Empty = "",
  ProyectoSENAVE = "Proyecto SENAVE",
}

export enum UnitsCode {
  Un = "UN",
}

export enum UnitsDescription {
  Unidad = "Unidad",
}
