export interface DepartmentResponse {
    departmentId: number;
    name: string;
    company: string;
    auditCreateDate: Date;
    state:number;
    stateDepartment: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface DepartmentByIdResponse {
    departmentId: number;
    name: string;
    company: string;
    state: number;
  }