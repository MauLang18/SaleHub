import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { getIcon } from "@shared/functions/helpers";
import { TicketRequest } from "../models/ticket-request.interface";
import {
  TicketByIdResponse,
  TicketResponse,
} from "../models/ticket-response.interface";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_TICKETS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformTicketData(resp)));
  }

  private transformTicketData(response: BaseResponse): BaseResponse {
    response.data.forEach((ticket: TicketResponse) => {
      ticket.icReport = getIcon("icCloudDownload", "Descargar Ticket", true);
      ticket.icVisibility = getIcon("icVisibility", "Ver Detalle del Ticket", true);
      ticket.icCancel = getIcon("icCancel", "Anular Ticket", true);
    });

    return response;
  }

  ticketById(ticketId: number): Observable<TicketByIdResponse> {
    const requestUrl = `${env.api}${endpoint.TICKET_BY_ID}${ticketId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  ticketReport(data: TicketResponse): void {
    const requestUrl = `${env.api}${endpoint.SALE_REPORT}${data.ticketId}`;

    this._http
      .get(requestUrl, { responseType: "blob", observe: "response" })
      .subscribe((response) => {
        let fileName = `${data.ticketId}-${data.assignedTo}.pdf`; 

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response.body);
        link.download = fileName;
        link.click();

        link.remove();
        window.URL.revokeObjectURL(link.href);
      });
  }

  ticketRegister(ticket: TicketRequest) {
    const requestUrl = `${env.api}${endpoint.TICKET_CREATE}`;
    return this._http.post<BaseResponse>(requestUrl, ticket);
  }

  ticketCancel(ticketId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.TICKET_DELETE}${ticketId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
