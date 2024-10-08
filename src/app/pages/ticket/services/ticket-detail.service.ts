import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { InventoryDetailsResponse } from "../models/ticket-response.interface";

@Injectable({
  providedIn: "root",
})
export class TicketDetailService {
  constructor(private _http: HttpClient) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PRODUCTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformProductData(resp)));
  }

  private transformProductData(response: BaseResponse): BaseResponse {
    response.data.forEach((product: InventoryDetailsResponse) => {
      product.icAdd = getIcon("icAdd", "Agregar equipo al detalle", true);
    });

    return response;
  }
}
