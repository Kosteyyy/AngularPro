import { NgModule } from '@angular/core';
import { ModelModule } from '../model/model.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store.component';
import { CounterDirective } from './counter.directive';
import { CartSummaryComponent } from './cartSummary.component';
import { CheckoutComponent } from './checkout.component';
import { CartDetailComponent } from './cartDetail.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
    declarations: [
        StoreComponent,
        CounterDirective,
        CartSummaryComponent,
        CheckoutComponent,
        CartDetailComponent,
    ],
    exports: [StoreComponent, CartDetailComponent, CheckoutComponent],
})
export class StoreModule {}
