import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import icShoppingBasket from '@iconify/icons-ic/twotone-shopping-basket';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() customTemplate: TemplateRef<any>;
  icShoppingBasket = icShoppingBasket;
  currentYear: number;

  constructor() {
    // Obtener el año actual al inicializar el componente
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {}
}
