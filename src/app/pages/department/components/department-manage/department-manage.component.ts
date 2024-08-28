import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { DepartmentService } from "../../services/department.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentTypeService } from "@shared/services/document-type.service";

@Component({
  selector: "vex-department-manage",
  templateUrl: "./department-manage.component.html",
  styleUrls: ["./department-manage.component.scss"],
})
export class DepartmentManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      departmentId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      company: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _departmentService: DepartmentService,
    public _dialogRef: MatDialogRef<DepartmentManageComponent>,
    private _documentTypeService: DocumentTypeService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listDocumentTypes();
    if (this.data != null) {
      this.departmentById(this.data.data.departmentId);
    }
  }

  listDocumentTypes(): void {
    this._documentTypeService.listDocumentTypes().subscribe((resp) => {
      this.documentTypes = resp;
    });
  }

  departmentById(departmentId: number): void {
    this._departmentService.departmentById(departmentId).subscribe((resp) => {
      this.form.reset({
        departmentId: resp.departmentId,
        name: resp.name,
        company: resp.company,
        state: resp.state,
      });
    });
  }

  departmentSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const departmentId = this.form.get("departmentId").value;

    if (departmentId > 0) {
      this.departmentEdit();
    } else {
      this.departmentRegister();
    }
  }

  departmentRegister(): void {
    this._departmentService
      .departmentRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  departmentEdit(): void {
    this._departmentService
      .departmentEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
