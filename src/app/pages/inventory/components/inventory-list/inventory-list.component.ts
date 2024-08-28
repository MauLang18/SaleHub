import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { InventoryService } from "../../services/inventory.service";
import { componentSettings } from "./inventory-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InventoryManageComponent } from "../inventory-manage/inventory-manage.component";
import { InventoryResponse } from "../../models/inventory-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-inventory-list",
  templateUrl: "./inventory-list.component.html",
  styleUrls: ["./inventory-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class InventoryListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _inventoryService: InventoryService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Inventarios");
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
      .open(InventoryManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsInventories(true);
        }
      });
  }

  rowClick(rowClick: RowClick<InventoryResponse>) {
    let action = rowClick.action;
    let inventory = rowClick.row;

    switch (action) {
      case "edit":
        this.inventoryEdit(inventory);
        break;
      case "remove":
        this.inventoryRemove(inventory);
        break;
      case "report":
        this.inventoryReport(inventory);
        break;
    }

    return false;
  }

  inventoryReport(inventory: InventoryResponse) {
    this._inventoryService.inventoryReport(inventory);
  }

  inventoryEdit(inventoryData: InventoryResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = inventoryData;

    this._dialog
      .open(InventoryManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsInventories(true);
        }
      });
  }

  inventoryRemove(inventoryData: InventoryResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el equipo ${inventoryData.code} ?`,
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
        this._inventoryService
          .inventoryRemove(inventoryData.inventoryId)
          .subscribe(() => this.setGetInputsInventories(true));
      }
    });
  }

  setGetInputsInventories(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Inventory?Download=True`;
  }
}