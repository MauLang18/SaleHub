import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentTypeListComponent } from './components/equipment-type-list/equipment-type-list.component';

const routes: Routes = [
  {
    path: "",
    component: EquipmentTypeListComponent,
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentTypeRoutingModule { }
