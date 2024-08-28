import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
  // CATEGORY MODULE
  LIST_CATEGORIES: "Category",
  LIST_SELECT_CATEGORIES: "Category/Select",
  CATEGORY_BY_ID: "Category/",
  CATEGORY_REGISTER: "Category/Register/",
  CATEGORY_EDIT: "Category/Edit/",
  CATEGORY_REMOVE: "Category/Remove/",

  // AUTH MODULE
  LOGIN: "Login/Login",
  LOGIN_GOOGLE: "Auth/LoginWithGoogle",

  // PROVIDER MODULE
  LIST_PROVIDERS: "Provider",
  LIST_SELECT_PROVIDERS: "Provider/Select",
  PROVIDER_REGISTER: "Provider/Register/",
  PROVIDER_EDIT: "Provider/Edit/",
  PROVIDER_BY_ID: "Provider/",
  PROVIDER_REMOVE: "Provider/Remove/",

  // DOCUMENT TYPE MODULE
  LIST_DOCUMENT_TYPES: "DocumentType",

  // WAREHOUSE MODULE
  LIST_WAREHOUSES: "Warehouse",
  LIST_SELECT_WAREHOUSES: "Warehouse/Select",
  WAREHOUSE_BY_ID: "Warehouse/",
  WAREHOUSE_REGISTER: "Warehouse/Register/",
  WAREHOUSE_EDIT: "Warehouse/Edit/",
  WAREHOUSE_REMOVE: "Warehouse/Remove/",

  // PRODUCT MODULE
  LIST_PRODUCTS: "Product",
  PRODUCT_BY_ID: "Product/",
  PRODUCT_REGISTER: "Product/Register/",
  PRODUCT_EDIT: "Product/Edit/",
  PRODUCT_REMOVE: "Product/Remove/",
  PRODUCT_STOCK_WAREHOUSE: "Product/ProductStockByWarehouse/",

  // PURCHARSE MODULE
  LIST_PURCHARSES: "Purcharse",
  PURCHARSE_BY_ID: "Purcharse/",
  PURCHARSE_REGISTER: "Purcharse/Register/",
  PURCHARSE_CANCEL: "Purcharse/Cancel/",

  // SALE MODULE
  LIST_SALES: "Sale",
  SALE_BY_ID: "Sale/",
  SALE_REGISTER: "Sale/Register/",
  SALE_CANCEL: "Sale/Cancel/",
  SALE_REPORT: "Sale/Report/",

  // CLIENT MODULE
  LIST_CLIENTS: "Client",
  LIST_SELECT_CLIENTS: "Client/Select",
  CLIENT_REGISTER: "Client/Register/",
  CLIENT_EDIT: "Client/Edit/",
  CLIENT_BY_ID: "Client/",
  CLIENT_REMOVE: "Client/Remove/",

  // DOCUMENT TYPE MODULE
  LIST_VOUCHER_DOCUMENT_TYPES: "VoucherDocumentType",

  LIST_SELECT_EQUIPMENT_TYPE: 'EquipmentType/Select',
  LIST_SELECT_DEPARTMENT: 'Department/Select',
  LIST_SELECT_LOCATION: 'Location/Select',
  LIST_SELECT_EMPLOYEE: 'Employee/Select',
  LIST_SELECT_USER: 'User/Select',

  LIST_USERS: 'User',
  USER_BY_ID: 'User/',
  USER_CREATE: 'User/Create',
  USER_UPDATE: 'User/Update',
  USER_DELETE: 'User/Delete/',

  LIST_INVENTORIES: 'Inventory',
  INVENTORY_BY_ID: 'Inventory/',
  INVENTORY_CREATE: 'Inventory/Create',
  INVENTORY_UPDATE: 'Inventory/Update',
  INVENTORY_DELETE: 'Inventory/Delete/',
  REPORT_QR: 'Report/QRCode/',

  LIST_DEPARTMENTS: 'Department',
  DEPARTMENT_BY_ID: 'Department/',
  DEPARTMENT_CREATE: 'Department/Create',
  DEPARTMENT_UPDATE: 'Department/Update',
  DEPARTMENT_DELETE: 'Department/Delete/',

  LIST_LOCATIONS: 'Location',
  LOCATION_BY_ID: 'Location/',
  LOCATION_CREATE: 'Location/Create',
  LOCATION_UPDATE: 'Location/Update',
  LOCATION_DELETE: 'Location/Delete/',

  LIST_EQUIPMENT_TYPES: 'EquipmentType',
  EQUIPMENT_TYPE_BY_ID: 'EquipmentType/',
  EQUIPMENT_TYPE_CREATE: 'EquipmentType/Create',
  EQUIPMENT_TYPE_UPDATE: 'EquipmentType/Update',
  EQUIPMENT_TYPE_DELETE: 'EquipmentType/Delete/',

  LIST_EMPLOYEES: 'Employee',
  EMPLOYEE_BY_ID: 'Employee/',
  EMPLOYEE_CREATE: 'Employee/Create',
  EMPLOYEE_UPDATE: 'Employee/Update',
  EMPLOYEE_DELETE: 'Employee/Delete/',

  LIST_TICKETS: 'Ticket',
  TICKET_BY_ID: 'Ticket/',
  TICKET_CREATE: 'Ticket/Create',
  TICKET_DELETE: 'Ticket/Delete/',
  REPORT_PDF: 'Report/Pdf/'
};

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
