import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { EmployeeRequest, EmployeeUpdateRequest } from "../models/employee-request.interface";
import {
  EmployeeByIdResponse,
  EmployeeResponse,
} from "../models/employee-response.interface";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_EMPLOYEES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: EmployeeResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Empleado", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Empleado", true);
        });
        return resp;
      })
    );
  }

  employeeById(employeeId: number): Observable<EmployeeByIdResponse> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_BY_ID}${employeeId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  employeeRegister(employee: EmployeeRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_CREATE}`;
    return this._http.post(requestUrl, employee).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  employeeEdit(
    employee: EmployeeUpdateRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_UPDATE}`;
    return this._http.put<BaseResponse>(requestUrl, employee);
  }

  employeeRemove(employeeId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.EMPLOYEE_DELETE}${employeeId}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
