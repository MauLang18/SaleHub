import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketCreateComponent } from './components/ticket-create/ticket-create.component';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketCreateComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
