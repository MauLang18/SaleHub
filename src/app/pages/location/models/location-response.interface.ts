export interface LocationResponse {
    locationId: number;
    name: string;
    address: string;
    auditCreateDate: Date;
    state:number;
    stateLocation: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface LocationByIdResponse {
    locationId: number;
    name: string;
    address: string;
    state: number;
  }