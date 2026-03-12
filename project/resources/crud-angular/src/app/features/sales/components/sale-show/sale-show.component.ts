import { Component, OnInit, inject } from '@angular/core';
import { Sale } from '../../models/sale.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-sale-show',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe],
  templateUrl: './sale-show.component.html',
  styleUrl: './sale-show.component.css'
})
export class SaleShowComponent implements OnInit {
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  sale: Sale | undefined;

  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      this.sale = response.sale;
    });
  }

  get totalPrice(): number {
    if (!this.sale?.materials) return 0;
    return this.sale.materials.reduce((sum, m) => {
      const price = m.pivot?.final_price ?? m.price ?? 0;
      return sum + Number(price);
    }, 0);
  }

  goBack() {
    this.router.navigate(['/sale']).then();
  }
}
