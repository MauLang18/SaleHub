export interface EmployeeResponse {
    employeeId: number;
    name: string;
    lastName: string;
    location: string;
    department: string;
    email: string;
    phone: string;
    auditCreateDate: Date;
    state:number;
    stateEmployee: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface EmployeeByIdResponse {
    employeeId: number;
    name: string;
    lastName: string;
    locationId: number;
    departmentId: number;
    email: string;
    phone: string;
    state: number;
  }