import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "@shared/guards/auth.guard";

const childrenRoutes: VexRoutes = [
  {
    path: "departamentos",
    loadChildren: () =>
      import("./pages/department/department.module").then(
        (m) => m.DepartmentModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "ubicaciones",
    loadChildren: () =>
      import("./pages/location/location.module").then(
        (m) => m.LocationModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "empleados",
    loadChildren: () =>
      import("./pages/employee/employee.module").then(
        (m) => m.EmployeeModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "tipo-de-equipos",
    loadChildren: () =>
      import("./pages/equipment-type/equipment-type.module").then((m) => m.EquipmentTypeModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "inventarios",
    loadChildren: () =>
      import("./pages/inventory/inventory.module").then((m) => m.InventoryModule),
  },
  // {
  //   path: "clientes",
  //   loadChildren: () =>
  //     import("./pages/client/client.module").then((m) => m.ClientModule),
  // },
  // {
  //   path: "almacenes",
  //   loadChildren: () =>
  //     import("./pages/warehouse/warehouse.module").then(
  //       (m) => m.WarehouseModule
  //     ),
  // },
  // {
  //   path: "productos",
  //   loadChildren: () =>
  //     import("./pages/product/product.module").then((m) => m.ProductModule),
  // },
  // {
  //   path: "proceso-ventas",
  //   loadChildren: () =>
  //     import("./pages/sale/sale.module").then(
  //       (m) => m.SaleModule
  //     ),
  // },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "inventarios",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
