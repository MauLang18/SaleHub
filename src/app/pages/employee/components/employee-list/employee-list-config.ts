import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { EmployeeResponse } from "../../models/employee-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Nombre",
    value: 1,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icName",
  },
  {
    label: "Apellido",
    value: 2,
    placeholder: "Buscar por Apellido",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icName",
  },
  {
    label: "Email",
    value: 3,
    placeholder: "Buscar por Email",
    validation: [GenericValidators.emailValidation],
    validation_desc: "Sólo se permite correos válidos.",
    icon: "icName",
  },
];

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumns<EmployeeResponse>[] = [
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-sm"],
    property: "name",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "APELLIDO",
    cssLabel: ["font-bold", "text-sm"],
    property: "lastName",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "lastName",
    visible: true,
    download: true,
  },
  {
    label: "DEPARTAMENTO",
    cssLabel: ["font-bold", "text-sm"],
    property: "department",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "department",
    visible: true,
    download: true,
  },
  {
    label: "UBICACIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "location",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "location",
    visible: true,
    download: true,
  },
  {
    label: "CORREO",
    cssLabel: ["font-bold", "text-sm"],
    property: "email",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "email",
    visible: true,
    download: true,
  },
  {
    label: "TELÉFONO",
    cssLabel: ["font-bold", "text-sm"],
    property: "phone",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "phone",
    visible: true,
    download: true,
  },
  {
    label: "F. DE CREACIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "auditCreateDate",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "stateEmployee",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  icEmployee: IconsService.prototype.getIcon("icProvider"),
  searchOptions,
  menuItems,
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  filters,
  resetFilters,
  getInputs,
  filename: "listado-de-empleados",
};
