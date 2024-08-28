import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { EquipmentTypeRequest, EquipmentTypeUpdateRequest } from "../models/equipment-type-request.interface";
import {
  EquipmentTypeByIdResponse,
  EquipmentTypeResponse,
} from "../models/equipment-type-response.interface";

@Injectable({
  providedIn: "root",
})
export class EquipmentTypeService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_EQUIPMENT_TYPES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: EquipmentTypeResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Tipo de equipo", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Tipo de equipo", true);
        });
        return resp;
      })
    );
  }

  equipmentTypeById(equipmentTypeId: number): Observable<EquipmentTypeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_BY_ID}${equipmentTypeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  equipmentTypeRegister(equipmentType: EquipmentTypeRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_CREATE}`;
    return this._http.post(requestUrl, equipmentType).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  equipmentTypeEdit(
    equipmentType: EquipmentTypeUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_UPDATE}`;
    return this._http.put<BaseResponse>(requestUrl, equipmentType);
  }

  equipmentTypeRemove(equipmentTypeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.EQUIPMENT_TYPE_DELETE}${equipmentTypeId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
