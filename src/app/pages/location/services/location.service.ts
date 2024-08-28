import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { LocationRequest, LocationUpdateRequest } from "../models/location-request.interface";
import {
  LocationByIdResponse,
  LocationResponse,
} from "../models/location-response.interface";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_LOCATIONS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: LocationResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Ubicación", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Ubicación", true);
        });
        return resp;
      })
    );
  }

  locationById(locationId: number): Observable<LocationByIdResponse> {
    const requestUrl = `${env.api}${endpoint.LOCATION_BY_ID}${locationId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  locationRegister(location: LocationRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LOCATION_CREATE}`;
    return this._http.post(requestUrl, location).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  locationEdit(
    location: LocationUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LOCATION_UPDATE}`;
    return this._http.put<BaseResponse>(requestUrl, location);
  }

  locationRemove(locationId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.LOCATION_DELETE}${locationId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
