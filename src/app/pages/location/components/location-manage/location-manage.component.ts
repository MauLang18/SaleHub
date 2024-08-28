import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { DocumentType } from "@shared/models/document-type.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { LocationService } from "../../services/location.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentTypeService } from "@shared/services/document-type.service";

@Component({
  selector: "vex-location-manage",
  templateUrl: "./location-manage.component.html",
  styleUrls: ["./location-manage.component.scss"],
})
export class LocationManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  documentTypes: DocumentType[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      locationId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      address: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _locationService: LocationService,
    public _dialogRef: MatDialogRef<LocationManageComponent>,
    private _documentTypeService: DocumentTypeService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listDocumentTypes();
    if (this.data != null) {
      this.locationById(this.data.data.locationId);
    }
  }

  listDocumentTypes(): void {
    this._documentTypeService.listDocumentTypes().subscribe((resp) => {
      this.documentTypes = resp;
    });
  }

  locationById(locationId: number): void {
    this._locationService.locationById(locationId).subscribe((resp) => {
      this.form.reset({
        locationId: resp.locationId,
        name: resp.name,
        address: resp.address,
        state: resp.state,
      });
    });
  }

  locationSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const locationId = this.form.get("locationId").value;

    if (locationId > 0) {
      this.locationEdit();
    } else {
      this.locationRegister();
    }
  }

  locationRegister(): void {
    this._locationService
      .locationRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  locationEdit(): void {
    this._locationService
      .locationEdit(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
