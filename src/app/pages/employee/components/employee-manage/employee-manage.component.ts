import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { EmployeeService } from "../../services/employee.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentTypeService } from "@shared/services/document-type.service";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { LocationSelectService } from "@shared/services/location-service.service";
import { DepartmentSelectService } from "@shared/services/department-service.service";

@Component({
  selector: "vex-employee-manage",
  templateUrl: "./employee-manage.component.html",
  styleUrls: ["./employee-manage.component.scss"],
})
export class EmployeeManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  locationSelect: SelectAutoComplete[];
  departmentSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      employeeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      locationId: [0, [Validators.required]],
      departmentId: [0, [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _employeeService: EmployeeService,
    public _dialogRef: MatDialogRef<EmployeeManageComponent>,
    private _locationSelectService: LocationSelectService,
    private _departmentSelectService: DepartmentSelectService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectDepartment();
    this.listSelectLocation();
    if (this.data != null) {
      this.employeeById(this.data.data.employeeId);
    }
  }

  listSelectLocation(): void {
    this._locationSelectService.listSelectLocations().subscribe((resp) => {
      this.locationSelect = resp;
    });
  }

  listSelectDepartment(): void {
    this._departmentSelectService.listSelectDepartments().subscribe((resp) => {
      this.departmentSelect = resp;
    });
  }

  employeeById(employeeId: number): void {
    this._employeeService.employeeById(employeeId).subscribe((resp) => {
      this.form.reset({
        employeeId: resp.employeeId,
        name: resp.name,
        lastName: resp.name,
        locationId: resp.locationId,
        departmentId: resp.departmentId,
        email: resp.email,
        phone: resp.phone,
        state: resp.state,
      });
    });
  }

  employeeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const employeeId = this.form.get("employeeId").value;

    if (employeeId > 0) {
      this.employeeEdit();
    } else {
      this.employeeRegister();
    }
  }

  employeeRegister(): void {
    this._employeeService
      .employeeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  employeeEdit(): void {
    this._employeeService
      .employeeEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
