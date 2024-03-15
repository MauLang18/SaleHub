import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ClientRequest } from "../models/client-request.interface";
import {
  ClientById,
  ClientResponse,
} from "../models/client-response.interface";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_CLIENTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: ClientResponse) {
          switch (prov.state) {
            case 0:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              prov.badgeColor = "text-green bg-green-light";
              break;
            default:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
          }
          prov.icEdit = getIcon("icEdit", "Editar Proveedor", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Proveedor", true);
        });
        return resp;
      })
    );
  }

  ClientById(clientId: number): Observable<ClientById> {
    const requestUrl = `${env.api}${endpoint.CLIENT_BY_ID}${clientId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  ClientRegister(client: ClientRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CLIENT_REGISTER}`;
    return this._http.post(requestUrl, client).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  ClientEdit(
    clientId: number,
    client: ClientRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CLIENT_EDIT}${clientId}`;
    return this._http.put<BaseResponse>(requestUrl, client);
  }

  ClientRemove(clientId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.CLIENT_REMOVE}${clientId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
