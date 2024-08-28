export interface EquipmentTypeResponse {
    equipmentTypeId: number;
    name: string;
    auditCreateDate: Date;
    state:number;
    stateEquipmentType: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface EquipmentTypeByIdResponse {
    equipmentTypeId: number;
    name: string;
    state: number;
  }