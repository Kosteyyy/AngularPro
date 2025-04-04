import { Component, IterableDiffer, IterableDiffers } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';
@Component({
    selector: 'app-order-table',
    templateUrl: 'orderTable.component.html',
})
export class OrderTableComponent {
    colsAndRows: string[] = ['name', 'zip', 'cart_p', 'cart_q', 'buttons'];

    dataSource = new MatTableDataSource<Order>(this.repository.getOrders());
    differ: IterableDiffer<Order>;

    constructor(private repository: OrderRepository, differs: IterableDiffers) {
        this.differ = differs.find(this.repository.getOrders()).create();
        console.log("🚀 ~ OrderTableComponent ~ constructor ~ differs:", differs, this.differ);
        this.dataSource.filter = 'true';
        this.dataSource.filterPredicate = (order, include) => {
            return !order.shipped || include.toString() == 'true';
        };
    }

    get includeShipped(): boolean {
        return this.dataSource.filter == 'true';
    }

    set includeShipped(include: boolean) {
        this.dataSource.filter = include.toString();
    }

    toggleShipped(order: Order) {
        order.shipped = !order.shipped;
        this.repository.updateOrder(order);
    }

    delete(id: number) {
        this.repository.deleteOrder(id);
    }

    ngDoCheck() {
        let changes = this.differ?.diff(this.repository.getOrders());
        console.log("🚀 ~ OrderTableComponent ~ ngDoCheck ~ changes:", changes)
        if (changes != null) {
            this.dataSource.data = this.repository.getOrders();
        }
    }
}
