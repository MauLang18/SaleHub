import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { EquipmentTypeService } from "../../services/equipment-type.service";
import { componentSettings } from "./equipment-type-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EquipmentTypeManageComponent } from "../equipment-type-manage/equipment-type-manage.component";
import { EquipmentTypeResponse } from "../../models/equipment-type-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-equipment-type-list",
  templateUrl: "./equipment-type-list.component.html",
  styleUrls: ["./equipment-type-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class EquipmentTypeListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _equipmentTypeService: EquipmentTypeService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Tipo de Equipos");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(EquipmentTypeManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsEquipmentTypes(true);
        }
      });
  }

  rowClick(rowClick: RowClick<EquipmentTypeResponse>) {
    let action = rowClick.action;
    let equipmentType = rowClick.row;

    switch (action) {
      case "edit":
        this.equipmentTypeEdit(equipmentType);
        break;
      case "remove":
        this.equipmentTypeRemove(equipmentType);
        break;
    }

    return false;
  }

  equipmentTypeEdit(equipmentTypeData: EquipmentTypeResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = equipmentTypeData;

    this._dialog
      .open(EquipmentTypeManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsEquipmentTypes(true);
        }
      });
  }

  equipmentTypeRemove(equipmentTypeData: EquipmentTypeResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el tipo de equipo ${equipmentTypeData.name} ?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._equipmentTypeService
          .equipmentTypeRemove(equipmentTypeData.equipmentTypeId)
          .subscribe(() => this.setGetInputsEquipmentTypes(true));
      }
    });
  }

  setGetInputsEquipmentTypes(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `EquipmentType?Download=True`;
  }
}
