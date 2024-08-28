import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { DepartmentRequest, DepartmentUpdateRequest } from "../models/department-request.interface";
import {
  DepartmentByIdResponse,
  DepartmentResponse,
} from "../models/department-response.interface";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_DEPARTMENTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: DepartmentResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Departamento", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Departamento", true);
        });
        return resp;
      })
    );
  }

  departmentById(departmentId: number): Observable<DepartmentByIdResponse> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_BY_ID}${departmentId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  departmentRegister(department: DepartmentRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_CREATE}`;
    return this._http.post(requestUrl, department).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  departmentEdit(
    department: DepartmentUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_UPDATE}`;
    return this._http.put<BaseResponse>(requestUrl, department);
  }

  departmentRemove(departmentId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.DEPARTMENT_DELETE}${departmentId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
