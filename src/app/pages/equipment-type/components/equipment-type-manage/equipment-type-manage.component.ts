import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { EquipmentTypeService } from "../../services/equipment-type.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentTypeService } from "@shared/services/document-type.service";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { LocationSelectService } from "@shared/services/location-service.service";
import { DepartmentSelectService } from "@shared/services/department-service.service";

@Component({
  selector: "vex-equipment-type-manage",
  templateUrl: "./equipment-type-manage.component.html",
  styleUrls: ["./equipment-type-manage.component.scss"],
})
export class EquipmentTypeManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  locationSelect: SelectAutoComplete[];
  departmentSelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      equipmentTypeId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _equipmentTypeService: EquipmentTypeService,
    public _dialogRef: MatDialogRef<EquipmentTypeManageComponent>,
    private _locationSelectService: LocationSelectService,
    private _departmentSelectService: DepartmentSelectService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectDepartment();
    this.listSelectLocation();
    if (this.data != null) {
      this.equipmentTypeById(this.data.data.equipmentTypeId);
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

  equipmentTypeById(equipmentTypeId: number): void {
    this._equipmentTypeService.equipmentTypeById(equipmentTypeId).subscribe((resp) => {
      this.form.reset({
        equipmentTypeId: resp.equipmentTypeId,
        name: resp.name,
        state: resp.state,
      });
    });
  }

  equipmentTypeSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const equipmentTypeId = this.form.get("equipmentTypeId").value;

    if (equipmentTypeId > 0) {
      this.equipmentTypeEdit();
    } else {
      this.equipmentTypeRegister();
    }
  }

  equipmentTypeRegister(): void {
    this._equipmentTypeService
      .equipmentTypeRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  equipmentTypeEdit(): void {
    this._equipmentTypeService
      .equipmentTypeEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
