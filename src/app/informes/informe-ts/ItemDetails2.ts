export interface ItemDetails2 {

    id:                               number;
    active:                           boolean;
    code:                             string;
    description:                      string;
    id_type_item:                     number;
    barcode:                          null | string;
    field_1:                          string;
    field_2:                          string;
    field_3:                          string;
    field_4:                          null | string;
    field_5:                          string;
    field_6:                          Field6;
    notes:                            null | string;
    min_stock_warning:                boolean | null;
    weight:                           null;
    is_serial_control:                boolean;
    lead_time:                        null;
    items_types_description:          ItemsTypesDescription;
    groups_description:               GroupsDescription | null;
    groups_1_description:             null;
    groups_2_description:             null;
    custom_fields_groups_description: null;
    units_description:                null;
    priorities_description:           PrioritiesDescription | null;
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
    latitude:                         null | string;
    longitud:                         null | string;
    groups_tasks_description:         null;
    units_code:                       null;
    custom_fields_values:             null;
    third_parties_name:               null;
    id_parent:                        number | null;
    visible_to_all:                   boolean;
    hours_average_daily_use:          null;
    available:                        boolean;
    initial_date_out_of_service:      null;
    last_final_date_available:        null;
    item_url:                         string;
    id_company:                       number;
}

export enum Field6 {
    Argentina = "ARGENTINA",
    Brasil = "BRASIL",
    Empty = "",
    Paraguay = "PARAGUAY",
}

export enum GroupsDescription {
    Ciudad = "CIUDAD",
    Departamento = "DEPARTAMENTO",
    Dependencia = "DEPENDENCIA",
    Distrito = "DISTRITO",
    Edificio = "EDIFICIO",
    Oficina = "OFICINA",
    Pais = "PAIS",
    Piso = "PISO",
}

export enum ItemsTypesDescription {
    Facilities = "FACILITIES",
}

export enum PrioritiesDescription {
    VeryHigh = "VERY_HIGH",
}
