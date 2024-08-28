export interface TicketResponse {
  ticketId: number;
  location: string;
  department: string;
  assignedTo: string;
  receivedBy: string;
  deliveredBy: string;
  auditCreateDate: Date;
  icReport: object;
  icVisibility: object;
  icCancel: object;
}

export interface InventoryDetailsResponse {
  inventoryId: number;
  image: string;
  code: string;
  active: string;
  brand: string;
  model: string;
  series: string;
  equipmentType: string;
  details: string;
  icAdd: object;
}

export interface TicketByIdResponse {
  ticketId: number;
  assignedToId: number;
  receivedById: number;
  deliveredById: number;
  ticketDetails: TicketDetailByIdResponse[];
}

export interface TicketDetailByIdResponse {
  inventoryId: number;
  code: string;
  active: string;
  equipmentType: string;
  brand: string;
  series: string;
  model: string;
  details: string;
}
